const { Ratings, Rates } = require('../models/Rating')

const RatingMiddleware = {
    insert(req, res, next) {
        const { rating_id, user_id, content, rate } = req.body
        if (!rating_id || !user_id || !content || !rate) {
            return res.status(404).json({
                code: 0,
                status: false,
                msg: 'Data cannot be empty or not valid!',
            })
        }

        Ratings.findById(rating_id)
            .then(result => {
                if (!result) {
                    return res.status(501).json({
                        code: 0,
                        status: false,
                        msg: 'Rating not exists!',
                    })
                }
                req.rating = result
                next()
            })
            .catch(err => {
                return res.status(500).json({
                    code: 0,
                    status: false,
                    msg: 'There was a problem adding information, please try again!',
                })
            })
    },
    show(req, res, next) {
        const { rating_id } = req.body

        if (!rating_id) {
            return res.status(404).json({
                code: 0,
                status: false,
                msg: 'Data cannot be empty or not valid!',
            })
        }

        next()
    }
}

module.exports = RatingMiddleware