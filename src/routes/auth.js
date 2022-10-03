const express = require('express')
const router = express.Router()

const Auth = require('../app/controllers/AuthController')

router.use('/login', Auth.login)
router.use('/register', Auth.register)

module.exports = router