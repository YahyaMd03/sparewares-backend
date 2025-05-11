const mongoose = require('mongoose')
const { Schema } = mongoose

const Return = new Schema({
    orderId: {
        type: String,
        required: true,
    },
    orderNumber: {
        type: String,
        required: true,
    },
    orderItemId: {
        type: String, 
        required: true,
    },
    orderedAt: {
        type: String, 
        required: true,
    },
    customerId: {
        type: String,
        required: true
    },
    customerNumber: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productPartNumber: {
        type: String,
        required: true
    },
    productPrice: {
        type: String,
        required: true
    },
    productImage: {
        type:String,
    },
    quantity: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    },
    returnedAt: {
        type: String,
        required: true
    },  
    approvedOrRejectAt: {
        type: String,
    },  
},
{timestamps:true})


   module.exports = mongoose.model('tbl_return', Return)


