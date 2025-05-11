const mongoose = require('mongoose');

const ShippingPolicySchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('tbl_shipping_policy', ShippingPolicySchema);
