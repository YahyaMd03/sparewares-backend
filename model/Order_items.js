const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderItemSchema = new Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tbl_order",
    },
    orderNumber:{
        type:String,
        required:true
    },
    customerName:{
        type:String,
        required:true
    },
    customerNumber:{
        type:String,
        required:true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tbl_product",
    },

    part_number: {
        type: String,
        ref: "tbl_product",
    },
    order_product_name: {
        type: String,
        required: true
    },
    order_item_amount: {
        type: String,
        required: true
    },
    order_item_qty: {
        type: String,
        required: true
    },
    order_total_amount: {
        type: String,
        required: true
    },
    order_cgst_percent: {
        type: String,
        required: true
    },
    order_cgst_value: {
        type: String,
        required: true
    },
    order_sgst_percent: {
        type: String,
        required: true
    },
    order_sgst_value: {
        type: String,
        required: true
    },
    order_igst_percent: {
        type: String,
        // required: true
    },
    order_igst_value: {
        type: String,
        required: true
    },
    order_total_gst: {
        type: String,
        required: true
    },
    return:{
        type:String,
        default:""
    },
    returnId:{
        type:String,
        default:""
    },
    return_quantity:{
        type:String,
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
},
    { timestamps: true }
);

module.exports = mongoose.model('Tbl_orders_items', OrderItemSchema);
