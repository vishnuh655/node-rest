const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

//Database Connection
mongoose.connect(process.env.MONGODB)


//Logging
app.use(morgan('dev'))

//BodyParser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Static folder
app.use('/uploads',express.static('uploads/'))

//CORS
app.use((req, res, next) => {
    res.header('Allow-Access-Control-Origin', '*')
    res.header('Access-Control-Allow-Headers', 
    'Origin, X-Requeste-With, Content-Type, Accept, Authorization')
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods',
        'GET, PUT, POST, PATCH, DELETE')
        return res.status(200).json({})
    }
    next()
})

//Routes
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

//Error Handling
app.use((req, res, next) => {
    const error = new Error('Not Found.')
    error.status = 404
    next(error)
})
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app