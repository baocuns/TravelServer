
const Profile = require('../models/Profile')
const PhotosMini = require('../models/PhotosMini')
const Func = require('../../func')

const ProfileController = {
    // [GET] ~/profile
    index(req, res) {
        return res.status(200).json({
            code: 0,
            status: true,
            msg: 'You need something to go on!',
        })
    },

    // [POST] ~/store
    store(req, res) {
        const { user_id, fullname, email, phone, birthday, sex, country, address } = req.body
        const { id, username } = req.user
        const profile = new Profile({
            user_id: id,
            username: username,
            fullname: fullname,
            email: email,
            phone: phone,
            birthday: birthday,
            sex: sex,
            country: country,
            address: address,
            image: req.photos._id,
        })

        profile.save()
            .then(result => {
                return res.status(200).json({
                    code: 0,
                    status: true,
                    msg: 'You update profile success!',
                    data: result
                })
            })
            .catch(err => {
                return res.status(500).json({
                    code: 0,
                    status: false,
                    msg: 'You update profile faild!',
                })
            })
    },

    // [POST] ~/show/details/:username
    details(req, res) {
        const { username } = req.params

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
                    username: username
                }
            }
        ])
            .then(result => {
                Func.SimpleArrayPhotos(req, result)
                return res.status(200).json({
                    code: 0,
                    status: true,
                    msg: 'You show profile success!',
                    data: result
                })
            })
            .catch(err => {
                return res.status(500).json({
                    code: 0,
                    status: true,
                    msg: 'You show profile faild!',
                    err: err
                })
            })
    },

    // [POST] ~/show/all/:limit/:skip
    all(req, res) {
        const { limit, skip } = req.params
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
                $limit: parseInt(limit)
            },
            {
                $skip: parseInt(skip)
            }
        ])
            .then(result => {
                Func.SimpleArrayPhotos(req, result)
                return res.status(200).json({
                    code: 0,
                    status: true,
                    msg: 'You show all profile success!',
                    data: result
                })
            })
            .catch(err => {
                return res.status(500).json({
                    code: 0,
                    status: true,
                    msg: 'You show all profile faild!',
                    err: err
                })
            })
    },

    // [PUT] ~/update
    update(req, res) {
        const {fullname, phone, birthday, sex, country, address } = req.body
        const { id, username } = req.user

        Profile.findOneAndUpdate({
            user_id: id
        }, {
            fullname: fullname,
            phone: phone,
            birthday: birthday,
            sex: sex,
            country: country,   
            address: address,
        })
            .then(result => {
                return res.status(200).json({
                    code: 0,
                    status: true,
                    msg: 'You update profile success!',
                })
            })
            .catch(err => {
                return res.status(500).json({
                    code: 0,
                    status: false,
                    msg: 'You update profile faild!',
                })
            })
    }
}

module.exports = ProfileController