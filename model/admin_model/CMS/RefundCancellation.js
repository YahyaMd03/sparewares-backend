const mongoose = require('mongoose');

const RefundSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('tbl_refund_cancellation', RefundSchema);
