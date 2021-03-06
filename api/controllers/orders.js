const mongoose = require('mongoose')
const Order = require('../models/order')
const Product = require('../models/product')

const port = process.env.PORT || process.env.LocalPort

exports.orders_get_all = (req, res, next) => {
    Order.find()
    .populate('product', 'name price')
    .select('-__v')
    .exec()
    .then(docs => {
        if(docs === null){
            res.status(200).json({message: 'No orders to show'})
        }
        res.status(200).json({
            count: docs.length,
            order: docs.map(doc => {
                return{
                    _id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request:{
                        type: 'GET',
                        url: `http://localhost:${port}/orders/${doc._id}`
                    }
                }
            })
            
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}

exports.orders_add = (req, res, next) => {
    Product.findById(req.body.productId)
    .exec()
    .then(product => {
        if(!product){
            res.status(404).json({
                message: 'Product not found'
            })
        }
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId
        })
        return order
        .save()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: 'Order Saved',
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                request:{
                    type:'GET',
                    url: `http://localhost:${port}/orders/` + order._id
                }
            })
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
}

exports.orders_get_id = (req, res, next) => {
    const id = req.params.orderId
    Order.findById(id)
    .populate('product', '-__v')
    .select('-__v')
    .exec()
    .then(docs => {
        if(!docs){
            return res.status(404).json({
                message: 'No order found.'
            })
        }
        res.status(200).json({
            order: docs,
            request: {
                type: 'GET',
                description: 'GET_ALL_ORDERS',
                url: `http://localhost:${port}/orders/`
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}

exports.orders_delete = (req, res, next) => {
    Order.remove({_id: req.params.orderId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Order deleted successfully',
            request: {
                type:'POST',
                description:'CREATE_NEW_ORDERS',
                url: `http://localhost:${port}/orders/`,
                body: {productId : 'ID', quantity: 'Number'}
            }
        })
    })
    .catch()
}