const mongoose = require('mongoose')

const Rate = new mongoose.Schema({
    user: {
        user_id: mongoose.Schema.Types.ObjectId,
        name: String,
        thumb: String,
    },
    content: {
        type: String,
        require: true,
    },
    rate: {
        type: Number,
        require: true,
    }
}, {
    timestamps: true
})

const Rating = new mongoose.Schema({
    totalRated: [],
    data: [Rate]
}, {
    timestamps: true
})

const Ratings = mongoose.model('Rating', Rating)
const Rates = mongoose.model('Rate', Rate)

module.exports = {Ratings, Rates}