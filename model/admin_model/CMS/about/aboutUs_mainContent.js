const mongoose = require('mongoose');

const MainContent = new mongoose.Schema({
    content: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('tbl_aboutUs_mainContent', MainContent);
