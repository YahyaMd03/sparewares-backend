const mongoose = require('mongoose')
const { Schema } = mongoose

const Category = new Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    image: {
        type: String, // or use Text if you have a library that supports it
        required: true, // Specify the content type (e.g., 'image/jpeg', 'image/png', etc.)
    },
    is_deleted: {
        type: Boolean,
        default: false
    },

    created_at: {
        type: Date,
        default: Date.now
    }
})

   module.exports = mongoose.model('tbl_category', Category)