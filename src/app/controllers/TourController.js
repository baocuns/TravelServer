const Photos = require('../models/Photos')
const Tour = require('../models/Tour')
const slug = require('slug')
const Func = require('../../func')
const PhotosMini = require('../models/PhotosMini')

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
    store(req, res, next) {
        // upload photos
        const tour = new Tour({
            username: req.user.username,
            title: req.tour.title,
            description: req.tour.description,
            price: req.tour.price,
            sale: req.tour.sale,
            area_slug: req.tour.area_slug,
            rating_id: req.rating._id,
            images_id: req.photos._id,
            time_start: req.tour.time_start,
            time_end: req.tour.time_end,
            address_start: req.tour.address_start,
            address_end: req.tour.address_end,
            schedule: req.tour.schedule,
            slug: slug(req.tour.title) + '-' + Date.now()
        })

        tour.save()
            .then(tour => {
                req.tour_id = tour._id
                next()
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

    // update schedule
    schedule(req, res) {
        Tour.findByIdAndUpdate(req.body.id, {
            "$push": {
                schedule: {
                    title: req.body.title,
                    date: req.body.date,
                    details: req.body.details,
                }
            }
        })
            .then(tour => {
                return res.status(200).json({
                    code: 0,
                    status: true,
                    msg: 'You update schedule tour success!',
                    date: tour
                })
            })
            .catch(err => {
                return res.status(500).json({
                    code: 0,
                    status: false,
                    msg: 'You update schedule tour faild!',
                    err: err
                })
            })
    },

    // [GET] tour/:username/:limit/:skip
    forUsername(req, res) {
        const { username } = req.params
        Tour.aggregate([
            {
                $lookup: {
                    from: 'photosminis',
                    localField: 'images_id',
                    foreignField: '_id',
                    as: 'images',
                }
            },
            {
                $match: {
                    username: username
                }
            }
        ])
            .then(result => {
                return res.status(200).json({
                    code: 0,
                    status: true,
                    msg: 'You successfully retrieved tour data.',
                    data: TourController.convertApiSimple(req, result)
                })
            })
            .catch(err => {
                return res.status(500).json({
                    code: 0,
                    status: true,
                    msg: 'You have failed to retrieve tour data!',
                    err: err
                })
            })
    },

    // [GET] /tour/show/all
    all(req, res) {
        console.log(req.limit, req.skip);
        Tour.aggregate([
            {
                $lookup: {
                    from: 'photosminis',
                    localField: 'images_id',
                    foreignField: '_id',
                    as: 'images',
                }
            },
        ])//.limit(req.limit).skip(req.skip)
            .then(result => {
                return res.status(200).json({
                    code: 0,
                    status: true,
                    msg: 'You get all tour success!',
                    data: TourController.convertApiSimple(req, result)
                })
            })
            .catch(err => {
                return res.status(500).json({
                    code: 0,
                    status: false,
                    msg: 'You get all tour faild!',
                    err: err,
                })
            })
    },

    // [GET] /tour/show/last-tour/:distance | 5
    lastTour(req, res) {
        const day = Func.BetweenTwoDays.nextDays(Date.now(), req.distance)
        Tour.aggregate([
            {
                $lookup: {
                    from: 'photosminis',
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
            .then(result => {
                return res.status(200).json({
                    code: 0,
                    status: true,
                    msg: 'You get last tour near now success!',
                    data: TourController.convertApiSimple(req, result)
                })
            })
            .catch(err => {
                return res.status(500).json({
                    code: 0,
                    status: false,
                    msg: 'You get last tour near now faild!',
                    err: err
                })
            })
    },

    // [GET] /tour/show/details/:slug
    details(req, res) {
        Tour.aggregate([
            {
                $lookup: {
                    from: 'photosminis',
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
                    data: TourController.convertApiSimpleDetails(req, result)
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
                    from: 'photosminis',
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
                    msg: 'You get tour for area success!',
                    data: TourController.convertApiSimple(req, result)
                })
            })
            .catch(err => {
                return res.status(500).json({
                    code: 0,
                    status: true,
                    msg: 'You get tour for area faild!',
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
                from: 'photosminis',
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
                    data: TourController.convertApiSimple(req, result)
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
    },

    // update id rating to tour 
    //[POST] ~/rating/store
    updateIdRating(req, res) {
        const id = req.body.parentId
        const ratingId = req.rating._id
        Tour.findByIdAndUpdate(id, {
            rating_id: ratingId
        })
            .then(result => {
                return res.status(200).json({
                    code: 0,
                    status: true,
                    msg: 'You rating success!',
                })
            })
            .catch(err => {
                return res.status(500).json({
                    code: 0,
                    status: true,
                    msg: 'You rating faild!',
                    err: err
                })
            })
    },

    // func convert mongodb to api simple
    convertApiSimple(req, result) {
        const url = req.protocol + '://' + req.get('host')
        var newResult = []
        result.map(e => {
            const { images, thumb, images_id, schedule, rating_id, follow_id, __v, ...others } = e
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

    // func convert mongodb to api simple details
    convertApiSimpleDetails(req, result) {
        const url = req.protocol + '://' + req.get('host')
        var newResult = []
        result.map(e => {
            const { images, thumb, images_id, schedule, rating_id, follow_id, __v, ...others } = e
            var newImages = []
            var newThumb = ''
            images[0].data.map(e => {
                newImages.push(url + '/api/v1/views/show/photos/' + e.title)
            })
            newThumb = newImages[0]
            newResult.push({
                ...others,
                thumb: newThumb,
                images: newImages,
                schedule: schedule,
            })
        })
        return newResult
    },

    // delete
    delete(req, res) {
        Tour.findByIdAndDelete(req.body.id)
            .then(result => {
                PhotosMini.findByIdAndDelete(result.images_id)
                    .then(result => {
                        const { data } = result
                        data.map(e => {
                            Photos.findOneAndDelete({
                                title: e.title
                            })
                                .then(() => {
                                    console.log('delete photos: ', e.title);
                                })
                        })
                        return res.status(200).json({
                            code: 0,
                            status: true,
                            msg: 'You rating success!',
                            data: result
                        })
                    })

            })
    },
}

module.exports = TourController