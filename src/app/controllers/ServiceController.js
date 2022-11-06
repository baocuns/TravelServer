const Service = require("../models/Service")


const ServiceController = {
    index(req, res) {
        return res.status(200).json({
            code: 0,
            status: true,
            msg: 'You need something to go on API service!',
        })
    },
    store(req, res) {
        const { id, username } = req.user
        Service.findOne({
            user_id: id
        })
            .then(result => {
                if (!result) {
                    ServiceController.create(req, res)
                } else {
                    ServiceController.insert(req, res)
                }
            })
            .catch(err => {
                return res.status(500).json({
                    code: 0,
                    status: false,
                    msg: 'You have added the service to the system failed!',
                    err: err
                })
            })
    },
    create(req, res) {
        const { id, username } = req.user
        const service = new Service({
            user_id: id,
            username: username,
            services: [{
                tour_id: req.tour_id
            }],
        })
        service.save()
            .then(() => {
                return res.status(200).json({
                    code: 0,
                    status: true,
                    msg: 'You have successfully added the service to the system!',
                })
            })
            .catch(err => {
                return res.status(500).json({
                    code: 0,
                    status: false,
                    msg: 'You have added the service to the system failed!',
                    err: err
                })
            })
    },
    insert(req, res) {
        const { id, username } = req.user
        Service.findOneAndUpdate({ user_id: id }, {
            '$push': {
                services: {
                    tour_id: req.tour_id,
                }
            }
        })
            .then(() => {
                return res.status(200).json({
                    code: 0,
                    status: true,
                    msg: 'You have successfully added the service to the system!',
                })
            })
            .catch(err => {
                return res.status(500).json({
                    code: 0,
                    status: false,
                    msg: 'You have added the service to the system failed!',
                    err: err
                })
            })
    },
    forUsernme(req, res, next) {
        const { username } = req.params
        // Service.findOne({
        //     username: username
        // })
        // .then(result => {
        //     req.tours = result.services
        //     next()
        // })
        // .catch(err => {
        //     return res.status(500).json({
        //         code: 0,
        //         status: false,
        //         msg: 'You have failed to retrieve tour data!',
        //     })
        // })
    }
}

module.exports = ServiceController