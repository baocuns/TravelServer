const express = require('express')
const PostsController = require('../app/controllers/PostsController')
const PostsMiddleware = require('../app/middleware/posts')
const auth = require('../app/middleware/auth')
const Upload = require('../app/middleware/upload')
const { Photo } = require('../app/controllers/UploadController')
const router = express.Router()

router.post('/store', Upload.upload, auth.verifyUserAuth, PostsMiddleware.store, Photo.storePhotos, PostsController.store)
router.put('/like/:pid', Upload.upload, auth.verifyUserAuth, PostsController.like)

router.get('/show/new', PostsController.new)
router.get('/show/hot', PostsController.hot)

router.use('/', PostsController.index)

module.exports = router