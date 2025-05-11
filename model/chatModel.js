const mongoose = require('mongoose')
const { Schema } = mongoose

const Chat = new Schema({
    ipAddress: {
        type: String,
        required: true,
    },
    customerName: {
        type: String,
        required: true
    },
    customerNumber: {
        type: String,
        default: false
    },
    customerId: {
        type: String,
        default: false
    },
    message: [{
    message:String,
    sendedBy:String,
    date:String
    }],
    isBlocked:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
})

module.exports = mongoose.model('Tbl_chat', Chat)