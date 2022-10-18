const express = require('express')
const router = express.Router()
const multer = require("multer");
const { Photo } = require('../app/controllers/UploadController')

// router
router.post('/photos', Photo.upload)

module.exports = router