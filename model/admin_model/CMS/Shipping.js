const mongoose = require('mongoose');

const shipping = new mongoose.Schema({
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('tbl_shipping_fee', shipping);
