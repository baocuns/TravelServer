const express = require('express')
const router = express.Router()

const area = require('../app/controllers/AreaController')

router.post('/store', area.store)
router.get('/show', area.show)
router.use('/', area.index)

module.exports = router