const mongoose = require('mongoose')

const Category = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true 
    },
    image:{
        type:String,
        required:true 
    },
    is_deleted:{
        type:Boolean,
        default:false
    }
},
{timeStamp:true}
)

module.exports = mongoose.model('tbl_category',Category)