const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const { Customer, Invitation } = require('./models')
const midtransClient = require('midtrans-client')
const {tokenGenerator} = require('./helpers/jwt')
const {comparePassword} = require('./helpers/bcrypt')
const {authentication} = require('./middlewares/auth')
const errorHandler = require('./middlewares/errorHandler')
const axios = require('axios')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.post('/register', async (req, res, next) => {
    try {
        const {username, email, password} = req.body
        const data = await Customer.create({username, email, password})
        res.status(201).json({id: data.id, email: data.email})
    } catch (err) {
        next(err)
    }
})
app.post('/login', async (req, res, next) => {
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
})
app.get('/generatequotes', async (req, res, next) => {
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
})

app.use(authentication)

app.patch('/buy-invitation', async (req, res, next) => {
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
})
app.post('/generate-midtrans-token', async (req, res, next) => {
    try {
        const findCustomer = await Customer.findByPk(req.customer.id)        

        let snap = new midtransClient.Snap({
            // Set to true if you want Production Environment (accept real transaction).
            isProduction : false,
            serverKey : 'SB-Mid-server-pJHwf2iqqrzJ3vuJgJVhHd6P'
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
})

app.use(errorHandler)
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))