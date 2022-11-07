const express = require('express')
const ClientController = require('../app/controllers/ClientController')
const router = express.Router()
const auth = require('../app/middleware/auth')

router.get('/:slug', ClientController.index)
router.get('/', ClientController.index)

module.exports = router