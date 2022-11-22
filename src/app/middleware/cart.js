const Tour = require('../models/Tour')

const CartMiddleware = {
    validId(req, res, next) {
        const slug = req.params.slug

        if (!slug) {
            return res.status(404).json({
                code: 0,
                status: false,
                msg: 'Data cannot be empty or not valid!',
            })
        }

        Tour.findOne({
            slug: slug
        })
            .then(result => {
                if (result) {
                    req.slug = slug
                    next()
                } else {
                    return res.status(404).json({
                        code: 0,
                        status: false,
                        msg: 'Service does not exist, please try again later',
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    code: 0,
                    status: false,
                    msg: 'There was a problem with the system, please try again!',
                    err: err
                })
            })
    }
}

module.exports = CartMiddleware