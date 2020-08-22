const express = require('express')
const router = express.Router()
const authController = require("./controller")
const { forgotPassword } = require('./controller')

router.post('/login', authController.login)
      .post('/signup', authController.signup)
      .post('/forgot-password', authController.forgotPassword)

module.exports = router