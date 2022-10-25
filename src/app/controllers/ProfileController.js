
const Profile = require('../models/Profile')

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
        const profile = new Profile({
            user_id: user_id,
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
                return res.status(200).json({
                    code: 0,
                    status: false,
                    msg: 'You update profile faild!',
                })
            })
    }
}

module.exports = ProfileController