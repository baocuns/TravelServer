const express = require('express')
const ServiceController = require('../app/controllers/ServiceController')
const middlewareAuth = require('../app/middleware/auth')
const UploadMiddleware = require('../app/middleware/upload')
const TourMiddleware = require('../app/middleware/tour')
const PhotosController = require('../app/controllers/PhotosController')
const TourController = require('../app/controllers/TourController')
const router = express.Router()

router.put('/store', UploadMiddleware.upload, middlewareAuth.verifyUserAuth, middlewareAuth.verifySuperAuth, TourMiddleware.store, PhotosController.store, TourController.store, ServiceController.store)
router.get('/:username', TourController.forUsername)

router.use('/', ServiceController.index)

module.exports = router 