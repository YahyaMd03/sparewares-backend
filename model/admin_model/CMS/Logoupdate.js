const mongoose = require('mongoose');

const Logo = new mongoose.Schema({
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('tbl_logo', Logo);
