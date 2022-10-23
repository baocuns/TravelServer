const jwt = require('jsonwebtoken')
const emailValidator = require('deep-email-validator');
const nodemailer = require('nodemailer');

const auth = {


    // verify token
    verifyToken(req, res, next) {
        const token = req.headers.token
        if (token) {
            // Cuns 12345 | key[Cuns], token[12345]
            const key = token.split(" ")[0]
            if (key !== 'Travel') return res.status(403).json({
                code: 0,
                status: false,
                msg: 'Key in not invalid!'
            })
            // token
            const accessToken = token.split(" ")[1]
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) return res.status(403).json({
                    code: 0,
                    status: false,
                    msg: 'Token in not invalid!',
                    err: err
                })
                req.user = user
                next()
            })
        }
        else {
            return res.status(401).json({
                code: 0,
                status: false,
                msg: 'You not authenticated!',
            })
        }
    },

    // verify token admin and current user
    verifyTokenAndAdminAuth(req, res, next) {
        auth.verifyToken(req, res, () => {
            if (req.user.username === req.params.username || req.user.permissions === 'Admin') {
                next()
            } else {
                return res.status(403).json({
                    code: 0,
                    status: false,
                    msg: 'You do not have permission to perform this operation!'
                })
            }
        })
    },

    // verify admin
    verifyAdminAuth(req, res, next) {
        auth.verifyToken(req, res, () => {
            if (req.user.permissions === 'Admin') {
                next()
            } else {
                return res.status(403).json({
                    code: 0,
                    status: false,
                    msg: 'You do not have permission to perform this operation!'
                })
            }
        })
    },

    // verify super
    verifySuperAuth(req, res, next) {
        auth.verifyToken(req, res, () => {
            if (req.user.permissions === 'Super') {
                next()
            } else {
                return res.status(403).json({
                    code: 0,
                    status: false,
                    msg: 'You do not have permission to perform this operation!'
                })
            }
        })
    },

    // verify super
    verifyUserAuth(req, res, next) {
        auth.verifyToken(req, res, () => {
            if (req.user.permissions === 'User') {
                next()
            } else {
                return res.status(403).json({
                    code: 0,
                    status: false,
                    msg: 'You do not have permission to perform this operation!'
                })
            }
        })
    },

    // verify email valid
    verifyEmailValid(req, res, next) {
        const { email } = req.body
        emailValidator.validate(email)
            .then(result => {
                const { valid, reason, validators } = result
                if (!valid) {
                    return res.status(400).json({
                        code: 0,
                        status: false,
                        msg: 'Please provide a valid email address!',
                        reason: validators[reason].reason
                    })
                }
                next()
            })
            .catch(err => {
                return res.status(400).json({
                    code: 0,
                    status: false,
                    msg: 'Please provide a valid email address!',
                    err: err
                })
            })
    },

    // send OTP email verify
    verifyEmailOTP(req, res, next) {
        const html = `<!DOCTYPE html> <html> <head> <meta charset="utf-8"> <meta http-equiv="x-ua-compatible" content="ie=edge"> <title>Welcome Email</title> </head> <body> <h2>Hello {{name}}! </h2> <p>We're glad to have you on board at {{company}}. </p> </body> </html>`

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'baonv.23.student@fit.tdc.edu.vn',
                pass: 'baominh12345'
            }
        });

        const mailOptions = {
            from: 'baonv.23.student@fit.tdc.edu.vn',
            to: '20211TT0723@mail.tdc.edu.vn',
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
        };

        transporter.sendMail(mailOptions)
        return
    }
}

module.exports = auth