const express = require('express')
const ProfileController = require('../app/controllers/ProfileController')
const UploadMiddleware = require('../app/middleware/upload')
const ProfileMiddleware = require('../app/middleware/profile')
const middlewareAuth = require('../app/middleware/auth')
const { Photo } = require('../app/controllers/UploadController')
const MiddlewareVerify = require('../app/middleware/verify')
const router = express.Router()

router.post('/store', UploadMiddleware.upload, middlewareAuth.verifyTokenUserAndAdminAuth, ProfileMiddleware.store, Photo.storePhotos, ProfileController.store)
router.put('/update', UploadMiddleware.upload, middlewareAuth.verifyTokenUserAndAdminAuth, ProfileController.update)
router.post('/show/all/:limit/:skip', middlewareAuth.verifyAdminAuth, ProfileController.all)
router.post('/show/details/:username', middlewareAuth.verifyTokenUserAndAdminAuth, ProfileController.details)

router.use('/', ProfileController.index)

module.exports = router