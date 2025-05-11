const mongoose = require('mongoose')
const { Schema } = mongoose

const Marquee = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true, 
    },
    sort_tag:{
       type:String,
       required:true,
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
   module.exports = mongoose.model('tbl_marquee', Marquee)