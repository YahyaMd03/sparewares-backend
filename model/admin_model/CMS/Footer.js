const mongoose = require('mongoose');

const Fname = new mongoose.Schema({
    Fname: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('tbl_footer', Fname);
