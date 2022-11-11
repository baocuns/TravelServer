const mongoose = require('mongoose')

const Reply = new mongoose.Schema({
    username: { //user comment
        type: String,
        required: true,
    },
    parent: { //user reply
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
})

const CommentsModel = new mongoose.Schema({
    posts_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    username: { //user comment
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    reply: [Reply]
}, {
    timestamps: true
})

const Comments = mongoose.model('Comments', CommentsModel)

module.exports = { Comments, Reply }