
const DB = require('../models')

class NewsController {

    // [GET] /user
    async index(req, res, next) {
        await DB.User.findAll()
            .then(result => res.send(result))
            .catch(next)
    }
}

module.exports = new NewsController