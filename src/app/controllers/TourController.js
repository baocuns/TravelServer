const Photos = require('../models/Photos')
const Tour = require('../models/Tour')
const slug = require('slug')
const Func = require('../../func')

const TourController = {
    // [GET] /tour
    index(req, res) {
        return res.status(200).json({
            code: 0,
            status: true,
            msg: 'You need something to go on!',
        })
    },

    // [POST] /tour/store
    store(req, res) {
        // upload photos
        const tour = new Tour({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            sale: req.body.sale,
            area_slug: req.body.area_slug,
            thumb: req.images.filename,
            images_id: req.photos._id,
            time_start: req.body.time_start,
            time_end: req.body.time_end,
            address_start: req.body.address_start,
            address_end: req.body.address_end,
            details: req.body.details,
            slug: slug(req.body.title) + '-' + Date.now()
        })

        tour.save()
            .then(tour => {
                return res.status(200).json({
                    code: 0,
                    status: true,
                    msg: 'You insert tour success!',
                    date: tour
                })
            })
            .catch(err => {
                return res.status(404).json({
                    code: 0,
                    status: false,
                    msg: 'You insert tour faild!',
                    err: err
                })
            })
    },

    // [GET] /tour/show/all
    all(req, res) {
        Tour.aggregate([
            {
                $lookup: {
                    from: 'photos',
                    localField: 'images_id',
                    foreignField: '_id',
                    as: 'images',
                }
            },
        ])
            .then(result => {
                return res.status(200).json({
                    code: 0,
                    status: true,
                    msg: 'You get all tour success!',
                    err: null,
                    data: result,
                })
            })
            .catch(err => {
                return res.status(404).json({
                    code: 0,
                    status: false,
                    msg: 'You need something to go on!',
                    err: err,
                    data: [],
                })
            })
    },

    // [GET] /tour/show/last-tour/:distance | 5
    lastTour(req, res) {
        const day = Func.BetweenTwoDays.nextDays(Date.now(), req.distance)

        Tour.aggregate([
            {
                $lookup: {
                    from: 'photos',
                    localField: 'images_id',
                    foreignField: '_id',
                    as: 'images',
                }
            },
            {
                $match: {
                    time_start: {
                        $lt: day,
                    }
                }
            }
        ])
            .then(tour => {
                return res.status(200).json({
                    code: 0,
                    status: true,
                    msg: 'You get last tour near now success!',
                    data: tour
                })
            })
            .catch(err => {
                return res.status(500).json({
                    code: 0,
                    status: false,
                    msg: 'You need something to go on!',
                    err: err
                })
            })
    },

    // [GET] /tour/show/details/:slug
    details(req, res) {
        Tour.aggregate([
            {
                $lookup: {
                    from: 'photos',
                    localField: 'images_id',
                    foreignField: '_id',
                    as: 'images',
                }
            },
            {
                $match: {
                    slug: req.slug
                }
            }
        ])
            .then(result => {
                return res.status(200).json({
                    code: 0,
                    status: true,
                    msg: 'You get details tour success!',
                    data: result
                })
            })
            .catch(err => {
                return res.status(500).json({
                    code: 0,
                    status: true,
                    msg: 'You get details tour faild!',
                    err: err
                })
            })
    },

    // [GEt] /tour/show/all/area/:slug
    forArea(req, res) {

        Tour.aggregate([
            {
                $lookup: {
                    from: 'photos',
                    localField: 'images_id',
                    foreignField: '_id',
                    as: 'images',
                }
            },
            {
                $match: {
                    area_slug: req.slug
                }
            }
        ])
            .then(result => {
                return res.status(200).json({
                    code: 0,
                    status: true,
                    msg: 'You get details tour success!',
                    data: result
                })
            })
            .catch(err => {
                return res.status(500).json({
                    code: 0,
                    status: true,
                    msg: 'You get details tour faild!',
                    err: err
                })
            })
    },

    // [GET] /tour/show/all/search/:keyword
    search(req, res) {
        Tour.aggregate([{
            $match: {
                $text: {
                    $search: req.keyword
                },
            }
        }, {
            $lookup: {
                from: 'photos',
                localField: 'images_id',
                foreignField: '_id',
                as: 'images',
            }
        },
        ])
            .then(result => {
                return res.status(200).json({
                    code: 0,
                    status: true,
                    msg: 'You search tour success!',
                    data: result
                })
            })
            .catch(err => {
                return res.status(500).json({
                    code: 0,
                    status: false,
                    msg: 'You search tour faild!',
                    err: err
                })
            })
    }
}

module.exports = TourController