const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    customerId:{
        type:String
    },
    email: {
        type: String,

    },
    number: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        select: false
    },
    user_type: {
        type: String,
        required: true
    },
    user_wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "tbl_product"
    }],
    billing_address: [{
        b_fname: String,
        b_country: String,
        b_lname: String,
        b_number: String,
        b_address: String,
        b_address2: String,
        b_city: String,
        b_state: String,
        b_pincode: String,
    }],
    shipping_address: [{
        s_fname: String,
        s_country: String,
        s_lname: String,
        s_number: String,
        s_address: String,
        s_address2: String,
        s_city: String,
        s_state: String,
        s_pincode: String,
        defaultAddress: {type:Boolean, default:false}
    }],

    usersearch: [{
        keyword : String ,
        id : String,
    },
],

    is_deleted: {
        type: Boolean,
        default: false
    },
    passwordResetToken: String,

},
    { timestamps: true }
)


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next;
    this.password = await bcrypt.hash(this.password, 14)

})
userSchema.methods.comparePasswordInDb = async function (password, password_db) {
    return await bcrypt.compare(password, password_db);
}

// userSchema.methods.resetToken = async ()=>{
// const token = crypto.
// }
module.exports = mongoose.model("tbl_user", userSchema)