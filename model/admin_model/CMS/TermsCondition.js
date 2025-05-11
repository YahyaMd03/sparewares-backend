const mongoose = require('mongoose');

const TermsConditionSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('tbl_terms_condition', TermsConditionSchema);
