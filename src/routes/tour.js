const express = require('express')
const TourController = require('../app/controllers/TourController')
const router = express.Router()
const TourMiddleware = require('../app/middleware/tour')
const UploadMiddleware = require('../app/middleware/upload')
const { Photo } = require('../app/controllers/UploadController')

router.post('/store', UploadMiddleware.upload, Photo.upload, TourMiddleware.store, TourController.store)
router.get('/show/last-tour/:distance', TourMiddleware.lastTour, TourController.lastTour)
router.get('/show/details/:slug', TourMiddleware.slug, TourController.details)
router.get('/show/all/area/:slug', TourMiddleware.slug, TourController.forArea)
router.get('/show/all/search/:keyword', TourMiddleware.keyword, TourController.search)
router.get('/show/all', TourController.all)

router.use('/', TourController.index)

module.exports = router