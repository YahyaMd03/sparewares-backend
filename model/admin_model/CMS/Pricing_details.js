const mongoose = require('mongoose');

const Pricing_details_Schema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('tbl_pricing_detail', Pricing_details_Schema);
