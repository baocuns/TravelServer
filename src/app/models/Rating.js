const mongoose = require('mongoose')

const Rate = new mongoose.Schema({
    uid: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
    rate: {
        type: String,
        require: true,
    }
}, {
    timestamps: true
})

const Rating = new mongoose.Schema({
    totalRated: [
        {
            key: {
                type: Number,
                default: 1
            },
            value: {
                type: Number,
                default: 0
            },
        },
        {
            key: {
                type: Number,
                default: 2
            },
            value: {
                type: Number,
                default: 0
            },
        },
        {
            key: {
                type: Number,
                default: 3
            },
            value: {
                type: Number,
                default: 0
            },
        },
        {
            key: {
                type: Number,
                default: 4
            },
            value: {
                type: Number,
                default: 0
            },
        },
        {
            key: {
                type: Number,
                default: 5
            },
            value: {
                type: Number,
                default: 0
            },
        },
    ],
    data: [Rate]
}, {
    timestamps: true
})

module.exports = mongoose.model('Rating', Rating)