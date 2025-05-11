const mongoose = require('mongoose')
const { Schema } = mongoose

const Manufactures = new Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    image: {
        type: String, 
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

module.exports = mongoose.model('Tbl_manufactures', Manufactures)