const mongoose = require('mongoose');

const Photos = new mongoose.Schema({
    data: [
        {
            img: String
        }
    ]
})

module.exports = mongoose.model('Photos', Photos)