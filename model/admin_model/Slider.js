const mongoose = require('mongoose')

const Slider = mongoose.Schema({
    img_name:{
        type:String,
        required:true
    },
    img_url:{
        type:String,
        required:true
    },
    active:{
        type:Boolean,
        default:true
    },
    sort_order:{
        type:String,
        required:true 
    },
    is_deleted:{
        type:String,
        default:false 
    }
},
{timeStamps:true}
)

module.exports = mongoose.model("Tbl_slider",Slider)
