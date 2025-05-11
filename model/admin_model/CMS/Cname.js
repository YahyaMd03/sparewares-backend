const mongoose = require('mongoose');

const Cname = new mongoose.Schema({
    Cname: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('tbl_Cname', Cname);
