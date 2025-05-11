const mongoose = require("mongoose");

const Delvierycharge = new mongoose.Schema(
  {
  
    cartItem:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Tbl_cart"
    }
  },
  { timestamps: true }
);



module.exports=mongoose.model("tbl_delviery",Delvierycharge)