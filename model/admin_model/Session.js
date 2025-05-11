const mongoose = require('mongoose')

const Session = new mongoose.Schema({
    user_id:{
        type:String,
        required:true 
    },
    token:{
        type:String,
        required:true 
    },
},
{timestamps:true}
)
module.exports = mongoose.model("Tbl_session",Session)