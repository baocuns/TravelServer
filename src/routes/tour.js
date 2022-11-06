const express = require('express')
const TourController = require('../app/controllers/TourController')
const router = express.Router()
const TourMiddleware = require('../app/middleware/tour')
const UploadMiddleware = require('../app/middleware/upload')
const { Photo } = require('../app/controllers/UploadController')
const RatingController = require('../app/controllers/RatingController')

router.post('/store', UploadMiddleware.upload, TourMiddleware.store, Photo.storePhotos, RatingController.store, TourController.store)
router.post('/update/schedule', TourController.schedule)
router.get('/show/last-tour/:distance', TourMiddleware.lastTour, TourController.lastTour)
router.get('/show/details/:slug', TourMiddleware.slug, TourController.details)
router.get('/show/all/area/:slug', TourMiddleware.slug, TourController.forArea)
router.get('/show/all/search/:keyword', TourMiddleware.keyword, TourController.search)
router.get('/show/all/:limit/:skip', TourMiddleware.limitskip, TourController.all)
router.get('/show/all/crawl', TourMiddleware.crawl)

router.delete('/delete', UploadMiddleware.upload, TourController.delete)

router.use('/', TourController.index)

module.exports = router