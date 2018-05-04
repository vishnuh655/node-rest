const express = require('express')
const router = express.Router()
const UsersController = require('../controllers/user')

// routes
router.post('/signup', UsersController.new_user)
router.post('/login', UsersController.user_login)
router.delete('/:userId', UsersController.user_delete)

module.exports = router