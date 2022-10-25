
const multer = require("multer");

const Upload = {
    upload(req, res, next) {
        const upload = multer().array('photos')

        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                return false
            } else if (err) {
                // An unknown error occurred when uploading.
                return false
            }
            // Everything went fine. save to database
            next()
        })
    },
    storage() {
        // SET STORAGE
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'src/public/uploads')
            },
            filename: function (req, file, cb) {
                cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1])
            }
        })
        return storage
    }
}

module.exports = Upload


// const upload = multer({ storage: storage }).single('avatar')
        // upload(req, res, function (err) {
        //     if (err instanceof multer.MulterError) {
        //         // A Multer error occurred when uploading.
        //     } else if (err) {
        //         // An unknown error occurred when uploading.
        //     }
        //     // Everything went fine. save to database
            
        //     next()
        // })