const express = require('express')
const ServiceController = require('../app/controllers/ServiceController')
const middlewareAuth = require('../app/middleware/auth')
const UploadMiddleware = require('../app/middleware/upload')
const TourMiddleware = require('../app/middleware/tour')
const { Photo } = require('../app/controllers/UploadController')
const RatingController = require('../app/controllers/RatingController')
const TourController = require('../app/controllers/TourController')
const router = express.Router()

router.put('/store', UploadMiddleware.upload, middlewareAuth.verifyUserAuth, middlewareAuth.verifySuperAuth, TourMiddleware.store, 
Photo.storePhotos, RatingController.store, TourController.store, ServiceController.store)

router.use('/', ServiceController.index)

module.exports = router