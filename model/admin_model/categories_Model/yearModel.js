const mongoose = require('mongoose')

const Year = new mongoose.Schema({
    year:{
        type:String,
        required:true 
    },
    is_deleted:{
        type:Boolean,
        default:false
    }
},
{timeStamp:true})

module.exports = mongoose.model("Tbl_year",Year)