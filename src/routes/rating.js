const express = require('express')
const RatingController = require('../app/controllers/RatingController')
const router = express.Router()

router.use('/', RatingController.index)

module.exports = router