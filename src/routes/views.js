const express = require('express')
const router = express.Router()
const siteController = require('../app/controllers/SiteController')
const SiteMiddleware = require('../app/middleware/site')

router.use('/show/photos/:slug', SiteMiddleware.photos, siteController.photos)

module.exports = router