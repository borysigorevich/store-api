const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
require('dotenv').config()

const notFoundMiddleware = require('./middlewares/notFound')
const errorHandlerMiddleware = require('./middlewares/errorHandler')

const productsRouter = require('./routes/products')
const authRouter = require('./routes/auth')

const connectDb = require('./db/dbConnection')

const PORT = process.env.PORT || 3000
const rootURL = '/api/v1'

//middleware
app.use(cookieParser())
app.use(expressSession({
    secret: process.env.SESSION_SECRET || 'hello world',
    resave: false,
    saveUninitialized: false
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


app.use(`${rootURL}/auth`, authRouter)

app.use((req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.status(401).json({msg: 'Please login first'})
    }
})

//routes
app.use(`${rootURL}/products`, productsRouter)

app.use((req, res, next) => {
    console.log('Hello from middleware')
    next()
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch(error => {
        console.log(error)
    })
