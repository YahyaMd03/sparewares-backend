const mongoose = require('mongoose')
const { DateTime } = require('luxon');
const { Schema } = mongoose

const ReturnDetails = new Schema({
    returnId: {
        type: String,
        required:true
      },
    conversation: [
        {
          reason: String,
          message: String,
          images: [],
          commentedBy: {type:String , default:"customer"},
          updatedAt:String          
        },
      ],
    created_at: {
        type: Date,
        default: Date.now
    },
},
{timestamps:true})

module.exports = mongoose.model('tbl_return_details', ReturnDetails)