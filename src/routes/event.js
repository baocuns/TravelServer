const express = require('express')
const EventController = require('../app/controllers/EventController')
const router = express.Router()
const auth = require('../app/middleware/auth')

router.get('/update', auth.verifyAdminAuth, EventController.update)
router.get('/show/all/:limit/:skip', EventController.all)
router.get('/show/details/:slug', EventController.details)
router.get('/', EventController.index)

module.exports = router