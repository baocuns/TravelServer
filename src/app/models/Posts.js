const mongoose = require('mongoose')

const Posts = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    like: {
        type: Number,
        default: 0,
    },
    likes: {
        type: Array,
        default: null,
    },
    comment: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Posts', Posts)