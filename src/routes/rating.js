const express = require('express')
const RatingController = require('../app/controllers/RatingController')
const RatingMiddleware = require('../app/middleware/rating')
const middlewareAuth = require('../app/middleware/auth')

const router = express.Router()

router.post('/insert', middlewareAuth.verifyTokenUserAndAdminAuth, RatingMiddleware.insert, RatingController.insert)
router.post('/show', RatingMiddleware.show, RatingController.show)

router.use('/', RatingController.index)

module.exports = router