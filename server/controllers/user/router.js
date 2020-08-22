const express = require('express')
const router = express.Router()
const userController = require("./controller")

router.get('/get-profile/:username', userController.getUserByUsername)
      .post('/update-profile', userController.updateUserById)
      .post('/change-password', userController.changePassword)
      .post('/favorite-posts', userController.getFavoritePostsByUserId)

module.exports = router