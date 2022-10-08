
const Admin = require('../models/Admin')


class SiteController {

    // [GET] /
    index(req, res, next) {
        Admin.findOne({
            name: 'admin'
        })
            .then(result => {
                const { name, messages } = result
                res.status(200).json({name, messages})
            })
            .catch(next)
    }

    // [POST] /store
    async store(req, res) {
        const admin = await new Admin({
            name: 'admin',
            messages: 'Why did you get lost here? Why?',
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