const mongoose = require('mongoose');

const Subcontent = new mongoose.Schema({
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('tbl_aboutUs_subcontent', Subcontent);
