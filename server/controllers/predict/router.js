const express = require('express')
const router = express.Router()
const predictController = require("./controller")

router.get('/', predictController.predict)

module.exports = router