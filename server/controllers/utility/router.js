const express = require('express')
const router = express.Router()
const utilityController = require("./controller")

router.post("/all", utilityController.getAllUtilities)
      .get("/all-predict", utilityController.getAllUtilitiesPredict)
      .get('/one', utilityController.getOneUtility)

module.exports = router