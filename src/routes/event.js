const express = require('express')
const router = express.Router()

const event = require('../app/controllers/EventController')

router.get('/destroy', event.destroy)
router.get('/update', event.update)
router.get('/show', event.show)
router.use('/', event.index)

module.exports = router