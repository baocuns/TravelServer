const mongoose = require('mongoose')

const Tour = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    sale: {
        type: Number,
        require: true,
    },
    ordered: {
        type: Number,
        default: 0
    },
    area_slug: {
        type: String,
        require: true,
    },
    rating_id: {
        type: String,
        default: ''
    },
    follow_id: {
        type: String,
        default: ''
    },
    thumb: {
        type: String,
        default: ''
    },
    images_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photos'
    },
    time_start: {
        type: Date,
        require: true,
    },
    time_end: {
        type: Date,
        require: true,
    },
    address_start: {
        type: String,
        require: true,
    },
    address_end: {
        type: String,
        require: true,
    },
    schedule: [{
        title: String,
        date: Date,
        details: String,
    }],
    slug: {
        type: String,
        default: ''
    },
}, {
    timestamps: true
})

Tour.index({
    title: 'text',
    description: 'text',
    area_slug: 'text',
    address_start: 'text',
    address_end: 'text',
    address_end: 'text',
    details: 'text',
})

module.exports = mongoose.model('Tour', Tour)