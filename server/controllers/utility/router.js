const express = require('express')
const router = express.Router()
const utilityController = require("./controller")

router.post("/all", utilityController.getAllUtilities)
      .get('/one', utilityController.getOneUtility)

module.exports = router