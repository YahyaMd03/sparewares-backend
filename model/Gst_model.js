const mongoose = require('mongoose')
const { Schema } = mongoose

const GST = new Schema({
    gst_HSN_SAC_code: {
        type: String,
        required: true,
    },
    gst_percentage: {
        type: Number,
        required: true
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

module.exports = mongoose.model('Tbl_gst', GST)