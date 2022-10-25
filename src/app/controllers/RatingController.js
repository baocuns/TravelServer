
const { Ratings, Rates } = require('../models/Rating')
const Profile = require('../models/Profile')
const mongoose = require('mongoose')

const RatingController = {
    // [GET] /rating
    index(req, res) {
        return res.status(200).json({
            code: 0,
            status: true,
            msg: 'You need something to go on!',
        })
    },

    // create rating
    store(req, res, next) {
        const totalRated = [
            { star: 1, value: 0 },
            { star: 2, value: 0 },
            { star: 3, value: 0 },
            { star: 4, value: 0 },
            { star: 5, value: 0 },
        ]

        const rating = new Ratings({
            totalRated: totalRated,
            data: []
        })
        rating.save()
            .then(result => {
                req.rating = result
                next()
            })
            .catch(err => {
                return res.status(500).json({
                    code: 0,
                    status: false,
                    msg: 'You rating faild!',
                    err: err
                })
            })
    },

    // [POST] ~/rating/insert
    insert(req, res) {
        const { rating_id, user_id, content, rate } = req.body

        Profile.aggregate([
            {
                $lookup: {
                    from: 'photosminis',
                    localField: 'image',
                    foreignField: '_id',
                    as: 'images',
                }
            },
            {
                $match: {
                    user_id: new mongoose.Types.ObjectId(user_id)
                }
            }
        ])
            .then(resultProfiile => {
                const totalRated = req.rating.totalRated
                const newTotalRated = RatingController.funcUpdateRate(totalRated, rate)
                const { user_id, fullname, images } = resultProfiile[0]
                const { title } = images[0].data[0]

                const rates = new Rates({
                    user: {
                        user_id: user_id,
                        name: fullname,
                        thumb: title,
                    },
                    content: content,
                    rate: rate,
                })
                Ratings.findByIdAndUpdate(rating_id, {
                    totalRated: newTotalRated,
                    '$push': {
                        data: rates
                    }
                })
                    .then(result => {
                        return res.status(200).json({
                            code: 0,
                            status: false,
                            msg: 'You rating success!'
                        })
                    })
                    .catch(err => {
                        return res.status(500).json({
                            code: 0,
                            status: false,
                            msg: 'You rating faild!',
                            err: err
                        })
                    })
            })
    },

    // [POST] ~/rating/show
    show(req, res) {
        Ratings.findById(req.body.rating_id)
            .then(result => {

                const { data, totalRated } = result
                const newData = RatingController.convertApiSimple(req, data)
                return res.status(200).json({
                    code: 0,
                    status: false,
                    msg: 'You get rating success!',
                    data: {
                        avg: RatingController.funcAverageRating(totalRated),
                        ratings: newData,
                    }
                })
            })
            .catch(err => {
                return res.status(500).json({
                    code: 0,
                    status: false,
                    msg: 'You get rating faild!',
                })
            })
    },

    funcUpdateRate(arr, rate) {
        const newArr = arr.map(e => {
            if (e.star == rate) {
                e.value++
                return e
            }
            return e
        })

        return newArr
    },

    funcAverageRating(arr) {
        var rateAverage = 0
        var rateCount = 0

        arr.map(item => {

            rateCount += item.value
            rateAverage += (item.star * item.value)
        })

        return rateAverage / rateCount
    },
    // func convert mongodb to api simple
    convertApiSimple(req, result) {
        const url = req.protocol + '://' + req.get('host')
        var newResult = result
        newResult.map(e => {
            e.user.thumb = url + '/api/v1/views/show/photos/' + e.user.thumb
        })
        return newResult
    },
}

module.exports = RatingController
