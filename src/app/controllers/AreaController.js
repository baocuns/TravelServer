const Area = require('../models/Area')
const slug = require('slug')

const AreaController = {
    index(req, res) {
        res.status(200).json({
            code: 0,
            status: true,
            msg: 'You need something to go on!'
        })
    },

    // [GET] /show/all
    all(req, res) {
        Area.aggregate([
            {
                $lookup: {
                    from: 'photosminis',
                    localField: 'image',
                    foreignField: '_id',
                    as: 'images',
                }
            },
        ])
            .then(result => {
                res.status(200).json({
                    code: 0,
                    status: true,
                    msg: 'Get all area successfully!',
                    data: AreaController.convertApiSimple(req, result)
                })
            })
            .catch(err => {
                res.status(500).json({
                    code: 0,
                    status: false,
                    msg: 'Get all area failed!',
                    err: err
                })
            })
    },

    // [GET] /show/details/:slug
    details(req, res) {
        Area.findOne({
            slug: req.params.slug
        })
            .then(area => {
                if (!area) {
                    return res.status(404).json({
                        code: 0,
                        status: false,
                        msg: 'Get details area failed!',
                        data: area
                    })
                }
                res.status(200).json({
                    code: 0,
                    status: true,
                    msg: 'Get details area success!',
                    data: area
                })
            })
            .catch(err => {
                res.status(404).json({
                    code: 0,
                    status: false,
                    msg: 'Get details area failed!',
                    err: err
                })
            })
    },

    // [GET] /show/all/:type
    type(req, res) {
        Area.find({
            type: req.params.type
        })
            .then(area => {
                if (!area.length) {
                    return res.status(404).json({
                        code: 0,
                        status: false,
                        msg: 'type region invalid!',
                        data: area
                    })
                }
                res.status(200).json({
                    code: 0,
                    status: true,
                    msg: 'Get all area type region success!',
                    data: area
                })
            })
            .catch(err => {
                res.status(404).json({
                    code: 0,
                    status: false,
                    msg: 'Get all type region area failed!',
                    err: err
                })
            })
    },

    // [POST] /store
    async store(req, res) {

        const area = new Area({
            title: req.body.title,
            region: req.body.region,
            type: slug(req.body.region),
            slug: slug(req.body.title)
        })

        area.save()
            .then(area => {
                res.status(200).json({
                    code: 0,
                    status: true,
                    msg: 'Insert area successfully!',
                    data: area
                })
            })
            .catch(err => {
                res.status(404).json({
                    code: 0,
                    status: false,
                    msg: 'Insert area failed!',
                    err: err
                })
            })
    },

    // [DELETE] /delete/:slug
    delete(req, res) {
        Area.findOneAndDelete({
            slug: req.params.slug
        })
            .then(area => {
                if (!area) {
                    return res.status(404).json({
                        code: 0,
                        status: false,
                        msg: 'Delete area failed!',
                        data: area
                    })
                }

                res.status(200).json({
                    code: 0,
                    status: true,
                    msg: 'Delete area successfully!',
                    data: area
                })
            })
            .catch(err => {
                res.status(404).json({
                    code: 0,
                    status: false,
                    msg: 'Delete area failed!',
                    err: err
                })
            })
    },

    // [PUT] /update/:slug
    update(req, res) {
        Area.findOneAndUpdate({
            slug: req.params.slug
        }, {
            title: req.body.title,
            region: req.body.region,
            type: slug(req.body.region),
            slug: slug(req.body.title),
        })
            .then(area => {
                if (!area) {
                    return res.status(404).json({
                        code: 0,
                        status: false,
                        msg: 'Update area failed!',
                        data: area
                    })
                }

                res.status(200).json({
                    code: 0,
                    status: true,
                    msg: 'Update area successfully!',
                    data: area
                })
            })
            .catch(err => {
                res.status(404).json({
                    code: 0,
                    status: false,
                    msg: 'Update area failed!',
                    err: err
                })
            })
    },

    // func convert mongodb to api simple
    convertApiSimple(req, result) {
        const url = req.protocol + '://' + req.get('host')
        var newResult = []
        result.map(e => {
            const { images, image, __v, ...others } = e
            var newImages = []
            var newThumb = ''
            images[0].data.map(e => {
                newImages.push(url + '/api/v1/views/show/photos/' + e.title)
                return
            })
            newThumb = newImages[0]
            newResult.push({
                ...others,
                thumb: newThumb,
            })
        })
        return newResult
    },
}

module.exports = AreaController