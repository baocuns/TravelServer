const Cart = require('../models/Cart')

const CartController = {
    // ~/
    index(req, res) {
        res.status(200).json({
            code: 0,
            status: true,
            msg: 'You need something to keep going into Comment!'
        })
    },
    // ~/store
    store(req, res) {
        const { id, username } = req.user
        const slug = req.slug

        Cart.findOne({
            username: username
        })
            .then(result => {
                if (result) {
                    if (result.carts.some(e => e === slug)) {
                        return res.status(406).json({
                            code: 0,
                            status: false,
                            msg: 'Service already in cart!',
                        })
                    }
                    CartController.insert(req, res)
                } else {
                    CartController.create(req, res)
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
    },
    create(req, res) {
        const { username } = req.user
        const slug = req.slug

        const cart = new Cart({
            username: username,
            carts: [slug]
        })

        cart.save()
            .then(() => {
                res.status(200).json({
                    code: 0,
                    status: true,
                    msg: 'You have successfully added shopping cart service!',
                })
            })
            .catch(err => {
                res.status(500).json({
                    code: 0,
                    status: false,
                    msg: 'There was a problem with the system, please try again!',
                    err: err
                })
            })
    },
    insert(req, res) {
        const { username } = req.user
        const slug = req.slug

        Cart.findOneAndUpdate({
            username: username,
        }, {
            $push: {
                carts: slug
            }
        })
            .then(() => {
                res.status(200).json({
                    code: 0,
                    status: true,
                    msg: 'You have successfully added shopping cart service!',
                })
            })
            .catch(err => {
                res.status(500).json({
                    code: 0,
                    status: false,
                    msg: 'There was a problem with the system, please try again!',
                    err: err
                })
            })
    },
    // ~/delete
    delete(req, res) {
        const { username } = req.user
        const slug = req.slug

        Cart.findOneAndUpdate({
            username: username
        }, {
            $pull: {
                carts: slug
            }
        })
            .then(() => {
                res.status(200).json({
                    code: 0,
                    status: true,
                    msg: 'You have successfully deleted shopping cart service!',
                })
            })
            .catch(err => {
                res.status(500).json({
                    code: 0,
                    status: false,
                    msg: 'There was a problem with the system, please try again!',
                    err: err
                })
            })
    },
    // ~/show
    show(req, res) {
        const { username } = req.user

        Cart.aggregate([
            {
                $lookup: {
                    from: "tours",
                    localField: "carts",
                    foreignField: "slug",
                    as: "tours"
                }
            }, {
                $match : {
                    username: username
                }
            }
        ])
            .then(result => {
                return res.status(200).json({
                    code: 0,
                    status: true,
                    msg: 'You have successfully show shopping cart service!',
                    data: result
                })
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

module.exports = CartController