
const Photos = require('../models/Photos')
const path = require('path');
const multer = require("multer");

const Photo = {
    // [GET] /forms
    forms(req, res) {
        res.send('<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>node js upload image to mongodb</title> </head> <body> <h1>Photos Image</h1> <form action="/api/v1/tour/store" enctype="multipart/form-data" method="POST"> <input type="file" name="photos" accept="image/*" multiple> <input type="submit" value="Photos Photo"> <input type="text" name="title"> <input type="text" name="description"> <input type="text" name="price"> <input type="text" name="area_id"> </form> </body> </html>')
    },

    // [POST] /upload
    upload(req, res, next) {
        const upload = multer({ storage: req.storage }).array('photos')
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                return false
            } else if (err) {
                // An unknown error occurred when uploading.
                return false
            }
            // Everything went fine. save to database
            const photos = new Photos({
                data: []
            })
            photos.save()
                .then(result => {
                    req.files.map(e => {
                        Photos.findByIdAndUpdate(result._id, {
                            "$push": {
                                data: {
                                    img: e.filename
                                }
                            }
                        }).then().catch()
                    })
                    req.photos = result
                    req.images = req.files[0]
                    next()
                })
                .catch(err => {
                    res.status(404).json({ err })
                })
        })
    },

    // /show photos form tour
    show(req, res) {
        Photos.findById(req.tour.images_id)
            .then(images => {
                return res.status(200).json({
                    code: 0,
                    status: true,
                    msg: 'You get last tour near now success!',
                    data: {
                        tour: req.tour,
                        photos: images,
                    }
                })
            })
            .catch(err => {
                return res.status(500).json({
                    code: 0,
                    status: false,
                    msg: 'You need something to go on!',
                    err: err
                })
            })
    },
}

module.exports = { Photo }