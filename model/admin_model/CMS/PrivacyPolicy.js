const mongoose = require('mongoose');

const PrivacySchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('tbl_privacy_policy', PrivacySchema);
