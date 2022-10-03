const bcrypt = require('bcrypt')

const users = []

class Auth {
    login(req, res, next) {
        res.send('Login')
    }

    async register(req, res, next) {

        try {
            const hashPassword = await bcrypt.hash('12345', 10)
            users.push({
                id: 1,
                name: 'bao',
                password: hashPassword,
            })
            res.send(users)
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = new Auth