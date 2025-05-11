const mongoose = require('mongoose');

const Contact_us_Schema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('tbl_contact_us', Contact_us_Schema);
