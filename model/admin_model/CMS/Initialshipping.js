const mongoose = require('mongoose');

const InitialshippingFee = new mongoose.Schema({
    initialPrice: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('tbl_Initialshipping_fee', InitialshippingFee);
