const mongoose = require('mongoose')

const Area = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    region: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photos'
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("Area", Area)