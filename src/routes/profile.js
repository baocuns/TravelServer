const express = require('express')
const ProfileController = require('../app/controllers/ProfileController')
const UploadMiddleware = require('../app/middleware/upload')
const ProfileMiddleware = require('../app/middleware/profile')
const middlewareAuth = require('../app/middleware/auth')
const { Photo } = require('../app/controllers/UploadController')
const router = express.Router()

router.post('/store', middlewareAuth.verifyTokenUserAndAdminAuth, UploadMiddleware.upload, ProfileMiddleware.store, Photo.storePhotos, ProfileController.store)

router.use('/', ProfileController.index)

module.exports = router