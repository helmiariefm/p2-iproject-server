const jwt = require('jsonwebtoken')
const tokenGenerator = (payload) => jwt.sign(payload, 'secret')
const verifyToken = (token) => jwt.verify(token, 'secret')

module.exports = { tokenGenerator, verifyToken}