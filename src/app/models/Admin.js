const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Admin = new Schema({
    name: { type: String, maxLength: 255 },
    messages: { type: String, maxLength: 600 },
    created_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Admin', Admin)