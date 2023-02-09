const {verifyToken} = require('../helpers/jwt')
const {Customer} = require('../models')

const authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        if(!access_token){
            throw {name: "Forbidden"}
        }
        
        const validateToken = verifyToken(access_token)
        if(!validateToken){
            throw {name: "Invalid token"}
        }

        const customer = await Customer.findByPk(validateToken.id)
        if(!customer){
            throw {name: "Forbidden"}
        }

        req.customer = {id: validateToken.id}

        next()
    } catch (err) {
        // res.status(403).json(err)
        next(err)
    }
}

module.exports = {authentication}