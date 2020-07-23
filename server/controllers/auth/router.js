const express = require('express')
const router = express.Router()
const authController = require("./controller")

router.post('/login', authController.login)
      .post('/signup', authController.signup)

module.exports = router