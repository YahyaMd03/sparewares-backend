const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
  {
    cart_user_user_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tbl_user",
    },
    cart_product_product_Id: {  
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tbl_product",
    },
    cart_quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    weight: {
      type: Number,
      // required: true,
    },
    cart_price: {
      type: Number,
      required: true,
    },
    save_for_later: {
      type: Boolean,
      default: false,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

CartSchema.statics.findCartItem = async function(userId, productId) {
  return this.findOne({
      cart_user_user_Id: userId,
      cart_product_product_Id: productId,
      is_deleted: false
  });
};

module.exports = mongoose.model('Tbl_cart', CartSchema);
