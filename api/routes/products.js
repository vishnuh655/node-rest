const express = require('express')
const router = express.Router()
const ProductsController = require('../controllers/products')
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

// routes
router.get('/', ProductsController.product_get_all)
router.post('/', checkAuth, upload.single('productImage'), ProductsController.new_product)
router.get('/:productId', ProductsController.product_get_id)
router.patch('/:productId', checkAuth, ProductsController.product_update)
router.delete('/:productId', checkAuth, ProductsController.product_delete)

module.exports = router