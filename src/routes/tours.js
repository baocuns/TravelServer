const express = require('express')
const router = express.Router()

const tours = require('../app/controllers/ToursController')

router.get('/:id', tours.show)
router.use('/', tours.index)

module.exports = router