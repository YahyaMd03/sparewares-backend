const mongoose = require('mongoose')

const WishList = new mongoose.Schema({
    user_id:{
        type:String,
        required:true 
    },
    product_id:{
        type:String,
        required:true 
    },
    is_deleted:{
        type:Boolean,
        default:false
    }
},
{timestamps:true}
)

module.exports = mongoose.model("Tbl_wishlist",WishList)