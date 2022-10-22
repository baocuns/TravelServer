
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const TokenController = require('./TokenController')

const Auth = {
    generateAccessToken(user) {
        return jwt.sign({
            id: user.id,
            admin: user.admin
        },
            process.env.JWT_ACCESS_KEY, {
            expiresIn: "1d"
        })
    },
    generateRefreshToken(user) {
        return jwt.sign({
            id: user.id,
            admin: user.admin
        },
            process.env.JWT_REFRESH_KEY, {
            expiresIn: "365d"
        })
    },
    // [POST] ~/auth/register
    async register(req, res) {
        const salt = await bcrypt.genSalt(10)
        const hashpass = await bcrypt.hash(req.body.password, salt)

        const user = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashpass,
        })

        user.save()
            .then(user => res.status(200).json(user))
            .catch(err => res.status(500).json(err))
    },

    // [POST] ~/auth/login
    login(req, res, next) {
        // clear token old
        res.clearCookie('refreshToken')
        const oldToken = req.cookies.refreshToken
        oldToken && TokenController.delete(oldToken)

        // login
        User.findOne({
            username: req.body.username,
        })
            .then(async user => {
                !user && res.status(404).json({ auth: 'admin', msg: 'user invalid !' })

                const validPassword = await bcrypt.compare(req.body.password, user.password)

                !validPassword && res.status(404).json({ auth: 'admin', msg: 'password invalid !' })

                if (user && validPassword) {
                    const accessToken = Auth.generateAccessToken(user)
                    const refreshToken = Auth.generateRefreshToken(user)

                    // save token
                    TokenController.store(refreshToken)

                    // refresh token to cookie
                    res.cookie('refreshToken', refreshToken, {
                        httpOnly: true,
                        secure: false,
                        path: '/',
                        sameSite: 'strict',
                    })


                    const { password, ...others } = user._doc;
                    res.status(200).json({ ...others, accessToken })
                }
            })
            .catch(next)
    },
    // [POST] ~/auth/logout
    logout(req, res, next) {
        res.clearCookie('refreshToken')
        TokenController.delete(req.cookies.refreshToken)
        // refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken)
        res.status(200).json({ auth: 'admin', msg: 'Logoout successfully!' })
    },
    // [POST] ~/auth/refresh
    refresh(req, res) {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) return res.status(401).json({ auth: 'admin', msg: 'You not athenticated!' })

        // check refreshToken
        if (!TokenController.find(refreshToken)) {
            return res.status(403).json({ auth: 'admin', msg: 'Refresh TokenController in not valid' })
        }

        // verify refreshToken
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            
            // delete token old
            TokenController.delete(refreshToken)
            // refreshTokens = refreshTokens.filter(token => token !== refreshToken)

            const newAccessToken = Auth.generateAccessToken(user)
            const newRefreshToken = Auth.generateRefreshToken(user)

            // save refresh token
            TokenController.store(newRefreshToken)

            // refresh refreshToken to store
            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict',
            })
            res.status(200).json({ accessToken: newAccessToken })
        })
    },

    // ------------------

    // [GET] ~/auth/user/show/all
    all(req, res, next) {
        User.find()
            .then(user => res.status(200).json(user))
            .catch(next)
    },
    // [GET] ~/auth/user/show/all
    details(req, res) {
        User.findOne({
            username: req.params.username
        })
            .then(user => {
                const { password, ...others } = user._doc;
                res.status(200).json({ ...others })
            })
            .catch(err => {
                res.status(404).json({ auth: 'admin', msg: 'You do not have permission to perform this operation!', err })
            })
    },

    // [DELETE] ~/auth/user/delete
    delete(req, res, next) {
        User.findById(req.params.id)
            .then(user => res.status(200).json({ auth: 'admin', msg: 'Delete user successfully!' }))
            .catch(next)
    },
}

module.exports = Auth