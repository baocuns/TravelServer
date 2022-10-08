const express = require('express')
const router = express.Router()

const siteController = require('../app/controllers/SiteController')

router.get('/admin/:name', siteController.admin)
router.use('/add', siteController.add)
router.use('/admin', siteController.index)


module.exports = router