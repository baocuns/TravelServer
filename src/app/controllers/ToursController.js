const DB = require('../models')

class Tours {
    // [GET] /tours
    async index(req, res, next) {
        await DB.Tours.findAll()
            .then(result => res.send(result))
            .catch(next)
    }
    // [POST] /tours/:id
    async show(req, res, next) {
        await DB.Tours.findByPk(req.params.id)
            .then(result => res.send(result))
            .catch(next)
    }
}

module.exports = new Tours