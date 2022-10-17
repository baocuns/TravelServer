
const Rating = require('../models/Rating')

const RatingController = {
    // [GET] /rating
    index(req, res) {
        return res.status(200).json({
            code: 0,
            status: true,
            msg: 'You need something to go on!',
        })
    }
}

module.exports = RatingController
