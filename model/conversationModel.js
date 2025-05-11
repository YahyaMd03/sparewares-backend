const mongoose=require("mongoose")

const conversationSchmea=new mongoose.Schema({
    groupTitle:{
        type:String,
    },
    member:{
        type:Array,
    },
    lastmessage:{
        type:String,
    },
    lastmessageId:{
        type:String,
    }
},{timestamps:true})


module.exports=mongoose.model("conversation",conversationSchmea)