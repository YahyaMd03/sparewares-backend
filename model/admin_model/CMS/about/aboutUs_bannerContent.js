const mongoose = require('mongoose');

const BannerContent = new mongoose.Schema({
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('tbl_aboutUs_bannerContent', BannerContent);
