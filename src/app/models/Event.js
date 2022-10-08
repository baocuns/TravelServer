const mongoose = require('mongoose')

const location = {
    longitude: 0,
    latitude: 0,
}

const Event = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: true,
    },
    rank: {
        type: Number,
        required: true,
    },
    time_start: {
        type: Date,
        required: true,
    },
    time_end: {
        type: Date,
        required: true,
    },
    location: {
        type: location,
        default: {}
    },
    slug: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Event', Event)