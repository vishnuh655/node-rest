const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Product = require('../models/product')

router.get('/', (req, res, next) => {
    Product.find()
    .select('name price _id')
    .exec()
    .then(doc => {
        console.log(doc)
        if(doc.length > 0){
            res.status(200).json({
                count: doc.length,
                product: doc.map(docs => {
                    return({
                        name: docs.name,
                        price: docs.price,
                        _id: docs._id,
                        request: {
                            type: 'GET',
                            url: `http://localhost:3000/products/${docs._id}`
                        }
                    })   
                })
            })
        } else{
            res.status(404).json({
                message: 'No products to show'
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

router.post('/', (req, res, next) => {

    const product = new Product({
        _id : mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product
    .save()
    .then(result => {
        console.log(result)
        if(result){
            res.status(200).json({
                message: 'Created product successfully.',
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        url: `http://localhost:3000/products/${result._id}`
                    }
                }
            })
        } else{
            res.status(404).json({
                message: "Product not found with given Id"
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId
    Product.findById(id)
    .select('name price _id')
    .exec()
    .then(doc => {
        if(doc === null){
            res.json({
                message: 'No product found.'
            })
        }
        console.log(doc)
        res.status(200).json({
            product: doc,
            request: {
                type: 'GET',
                description:'GET_ALL_PRODUCT',
                url: `http://localhost:3000/products/`
            }
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    })
})

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId
    const updateOps = {}
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
    Product.update({_id: id}, {$set: updateOps})
    .exec()
    .then(doc => {
        console.log(doc)
        res.status(200).json({
            message: 'Product Updated',
            request: {
                type: 'GET',
                url: `http://localhost:3000/products/${id}`
            }
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId
    Product.remove({
        _id: id
    })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Product deleted',
            request:{
                type: "POST",
                description: "CREATE_NEW_PRODUCT",
                url:"http://localhost:3000/products/",
                body: {name : 'String', price: 'Number'}
            }
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router