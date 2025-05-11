const mongoose = require('mongoose');

const Feedback = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    name:{
        type:String,
        required:true 
    },
    number:{
        type:String,
        required:true
    }
}, { timestamps: true });

module.exports = mongoose.model('tbl_feedback', Feedback);
