const express = require('express')
const router = express.Router()
const userController = require("./controller")

router.get('/get-profile/:username', userController.getUserByUsername)
      .post('/update-profile', userController.updateUserByUsername)
      .post('/change-password', userController.changePassword)

module.exports = router