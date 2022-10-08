
const Admin = require('../models/Admin')


class SiteController {

    // [GET] /home
    index(req, res, next) {
        Admin.find()
            .then(result => res.json(result))
            .catch(next)
    }

    // [POST] /add
    async add(req, res) {
        const admin = await new Admin({
            name: 'son',
            messages: 'xau nhu ma',
        })

        const result = await admin.save()
        res.json(result)
    }

    // [GET] /admin/:id
    admin(req, res, next) {
        Admin.findOne({ name: req.params.name })
            .then(rs => res.json(rs))
            .catch(next)
    }
}

module.exports = new SiteController