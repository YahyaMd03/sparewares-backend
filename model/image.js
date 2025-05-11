const mongoose = require('mongoose')
const { Schema } = mongoose

const Image = new Schema({
    name :{
        type: String,
        required: true,
    } ,
    image :{
        type: String,
        required: true,
    },

    created_at: {
        type: Date,
        default: Date.now
    }

})
module.exports = mongoose.model('Tbl_image', Image)