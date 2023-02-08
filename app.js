if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config() //ini yg ngebuat semua yg ada di file .env masuk kedalam process.en.VAR_NAME    
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const {authentication} = require('./middlewares/auth')
const errorHandler = require('./middlewares/errorHandler')
const Controller = require('./controllers/controller')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.post('/register', Controller.register)
app.post('/login', Controller.login)
app.post('/googlelogin', Controller.googlelogin)
app.get('/generatequotes', Controller.generatequotes)

app.use(authentication)

app.patch('/buy-invitation', Controller.buyInvitation)
app.post('/generate-midtrans-token', Controller.generateMidtransToken)
app.post('/createinvitation', Controller.createInvitation)

app.use(errorHandler)
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))