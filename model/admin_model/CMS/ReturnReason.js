
const mongoose = require('mongoose')
const {Schema} = mongoose

const Reason = new Schema({
    reason:{
        type:String,
        required:true
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
module.exports = mongoose.model('tbl_reason', Reason)