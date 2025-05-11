const mongoose = require("mongoose")
const {Schema} = mongoose


const subscribeModel = new Schema({
    email:{
        type:String,
        required:true
    },
},{timestamps:true});

module.exports = mongoose.model("Tbl_subscribe",subscribeModel)