const jwt = require('jsonwebtoken')

const auth = {


    // verify token
    verifyToken(req, res, next) {

        const token = req.headers.token
        if (token) {
            // Cuns 12345 | key[Cuns], token[12345]
            const key = token.split(" ")[0]
            if (key !== 'Travel') return res.status(403).json({ auth: 'admin', msg: 'Key in not invalid !' })

            // token
            const accessToken = token.split(" ")[1]
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) return res.status(403).json({ auth: 'admin', msg: 'Token in not invalid !' })
                req.user = user
                next()
            })
        }
        else {
            return res.status(401).json({ auth: 'admin', msg: 'You not authenticated !' })
        }
    },

    // verify token admin and current user
    verifyTokenAndAdminAuth(req, res, next) {
        auth.verifyToken(req, res, () => {
            if (req.user.id == req.params.id || req.user.admin) {
                next()
            } else {
                res.status(403).json({ auth: 'admin', msg: 'You do not have permission to perform this operation.!' })
            }
        })
    },

    // verify admin
    verifyAdminAuth(req, res, next) {
        auth.verifyToken(req, res, () => {
            if (req.user.admin) {
                next()
            } else {
                return res.status(403).json({ auth: 'admin', msg: 'You do not have permission to perform this operation.!' })
            }
        })
    }
}

module.exports = auth