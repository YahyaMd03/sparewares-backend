const mongoose = require('mongoose')
const { Schema } = mongoose

const Varient = new Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String, // or use Text if you have a library that supports it
        required: true,
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

module.exports = mongoose.model('Tbl_varient', Varient)