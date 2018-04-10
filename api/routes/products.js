const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')
const checkAuth = require('../middleware/check-auth')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads')
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    }
    else{
        cb(new Error('File type not acceptable'), false)
    }
}

const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})

const Product = require('../models/product')

router.get('/', (req, res, next) => {
    Product.find()
    .select('name price _id productImage')
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
                        productImage: docs.productImage,
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

router.post('/', checkAuth, upload.single('productImage'), (req, res, next) => {
    const product = new Product({
        _id : mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
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
                    productImage: result.productImage,
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
    .select('name price _id productImage')
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

router.patch('/:productId', checkAuth, (req, res, next) => {
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

router.delete('/:productId', checkAuth, (req, res, next) => {
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