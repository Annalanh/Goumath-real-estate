const express = require('express')
const router = express.Router()
const mailController = require("./controller")

router.put('/send', mailController.send)


module.exports = router