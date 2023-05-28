const express = require('express')
const app = express()
require('dotenv').config()

const productsRouter = require('./routes/products')

const connectDb = require('./db/dbConnection')

const PORT = process.env.PORT || 3500
const rootURL = '/api/v1'

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//routes
app.use(`${rootURL}/products`, productsRouter)

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})
