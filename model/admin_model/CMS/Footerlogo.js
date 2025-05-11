const mongoose = require('mongoose');

const LogoSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('tbl_footer_logo', LogoSchema);
