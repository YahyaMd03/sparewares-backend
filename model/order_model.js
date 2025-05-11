const mongoose = require('mongoose')
const { Schema } = mongoose
const { DateTime } = require('luxon');
const Order = new Schema({
    //order_id - auto increment 
    orderNumber:{
        type:String
    },
    paymentType:{
        type:String
    },
    transectionId:{
        type:String
    },
    customerId:{
        type:String
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tbl_user"
    },
    billing_address: {
        b_country: String,
        b_fname: String,
        b_lname: String,
        b_number: String,
        b_pincode: String,
        b_address: String,
        b_address2: String,
        b_city: String,
        b_state: String,
    },
    shipping_address: {
        s_country: String,
        s_fname: String,
        s_lname: String,
        s_number: String,
        s_pincode: String,
        s_address: String,
        s_address2: String,
        s_city: String,
        s_state: String,
        s_pincode: String,
    },
    order_invno: {
        type: String,
    },
    total_weight:{
        type:String
    },
    total_items:{
        type:String
    },
    total_products:{
        type:String
    },
    order_total_cgst: {
        type: String
    },
    order_total_sgst: {
        type: String
    },
    order_total_igst: {
        type: String
    },
    order_total_product_price: {
        type: String
    },
    order_shipping_fee: {
        type: String
    },
    order_total_discount: {
        type: String
    },
    order_total_amount: {
        type: String
    },
    user_name:{
        type:String
    },
    date: {
        type: String, // Store the formatted date as a string
    },
    deliveredDate:{
        type:String
    },
    customUpdateTime:{
        type:String,
        default:"",
    },
    status: {
            type: String,
            enum: ['pending', 'processing', 'completed'],
            default: 'pending'
        },

        is_deleted: {
            type: Boolean,
            default: false,
        },

    }, { timestamps: true }

)
Order.pre('save', function(next) {
    // Convert current time to IST
    const currentDate = DateTime.now().setZone('Asia/Kolkata').toJSDate();
    const formattedDateTime = currentDate.toLocaleString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'});
    this.date = formattedDateTime;
    next();
});

module.exports = mongoose.model('Tbl_order', Order)