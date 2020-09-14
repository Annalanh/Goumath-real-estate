const express = require('express')
const router = express.Router()
const notificationController = require("./controller")

router.get('/all-notis', notificationController.getAllNotisByUserId)
      .post('/create', notificationController.create)
      .get('/update', notificationController.updateNotiStt)

module.exports = router