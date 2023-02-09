const {Customer, Invitation} = require('../models')
const axios = require('axios')
const {OAuth2Client} = require('google-auth-library')
const midtransClient = require('midtrans-client')
const {tokenGenerator} = require('../helpers/jwt')
const {comparePassword} = require('../helpers/bcrypt')

class Controller{
    static async register(req, res, next) {
        try {
            const {username, email, password} = req.body
            const data = await Customer.create({username, email, password})
            res.status(201).json({id: data.id, email: data.email})
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next){
        try {
            const {email, password} = req.body
            const data = await Customer.findOne({where: {email}})
            if(!data){
                throw {name: 'Unauthorized'}
            }
            const validate = comparePassword(password, data.password)
            if(!validate){
                throw {name: 'Unauthorized'}
            }
            const payload =  {id: data.id, email: data.email}   
            const access_token = tokenGenerator(payload)
            res.status(200).json({access_token, email: data.email})
        } catch (err) {
            next(err)
        }
    }

    static async googlelogin(req, res, next) {
        // console.log('<<<<');
        // console.log(req.headers.google_token);
        const client = new OAuth2Client(process.env.GOOGLE_ID);
        const ticket = await client.verifyIdToken({
            idToken: req.body.idToken,
            audience: process.env.GOOGLE_ID,
        });
        const googlePayload = ticket.getPayload();
        console.log(googlePayload);
        const [customer, created] = await Customer.findOrCreate({
            where: { email: googlePayload.email },
            defaults: {
                username: googlePayload.name,
                email: googlePayload.email,
                password: `loginwithgoogle`,
                isBuy: false,
            },
            hooks: false,
        });
    
        console.log(customer);
    
        const payload = { id: customer.id };
        let access_token = tokenGenerator(payload);
        console.log(customer.username);
    
        res.status(200).json({
            access_token,
            role: customer.role,
            email: customer.email,
            username: customer.username
        });
    }

    static async generatequotes(req, res, next) {
        try {
            const { data} = await axios({
                method: 'get',
                url: 'https://api.api-ninjas.com/v1/quotes?category=love',
                headers: {'X-API-KEY': 'RQi6o7p7tXYxnXc/DGP+0w==qtGQyzdaSUFYxjhh'}
            })
            // console.log(data, "<<<< DATA")
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async buyInvitation(req, res, next) {
        try {
            await Customer.update(
                {isBuy: true},
                {
                    where: {
                        id: req.customer.id
                    }
                }
            )
            res.status(200).json({message: `${req.customer.username} successfully purchased the invitation`})
        } catch (err) {
            next(err)
        }
    }

    static async generateMidtransToken(req, res, next) {
        try {
            const findCustomer = await Customer.findByPk(req.customer.id)        
    
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction : false,
                serverKey : process.env.MIDTRANS_SERVER_KEY
            });
    
            let parameter = {
                "transaction_details": {
                    "order_id": "TRANSACTION_" + Math.floor(1000000 + Math.random() * 9000000),
                    "gross_amount": 1000000
                },
                "credit_card":{
                    "secure" : true
                },
                "customer_details": {
                    // "first_name": "budi",
                    // "last_name": "pratama",
                    "email": findCustomer.email,
                    // "phone": "08111222333"
                }
            };
    
            const midtransToken = await snap.createTransaction(parameter)
    
            res.status(201).json(midtransToken)
        } catch (err) {
            next(err)
        }
    }

    static async createInvitation(req, res, next) {
        try {
            const {
                routeName,
                cpw,
                cpp,
                weddingDay,
                greeting,
                akadStart,
                akadEnd,
                resepsiStart,
                resepsiEnd,
                location,
                loveQuote
            } = req.body
            // console.log(quote)
            const createInvitation = await Invitation.create({
                routeName,
                cpw,
                cpp,
                weddingDay,
                greeting,
                akadStart,
                akadEnd,
                resepsiStart,
                resepsiEnd,
                location,
                loveQuote,
                CustomerId: req.customer.id
            })
            res.status(201).json(createInvitation)
        } catch (err) {
            next(err)
        }
    }

    static async invitationName(req, res, next){
        console.log(req.params)
        try {
            const getData = await Invitation.findOne({                
                where: {
                    routeName: req.params.invitationName
                }
            })
            // console.log(getData, '<<<<<!!!!!!')
            if(getData){
                res.status(200).json(getData)
            }else{
                throw {name: 'WrongId'}
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller