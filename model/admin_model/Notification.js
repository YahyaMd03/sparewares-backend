const mongoose = require('mongoose')

const Notification = new mongoose.Schema({
    type:{
        type:String,
        required:true 
    }
},
{timestamps:true}
)
module.exports = mongoose.model("Tbl_notification",Notification)