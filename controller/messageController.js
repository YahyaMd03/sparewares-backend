const messageSchema=require("../model/Messagemodel")
const path=require("path")

exports.createMessage=async(req,res)=>{
    try{
       const message=req.body
       let image
       if(req.file){
        image=req.file.filename
       }
       const newMessage=await messageSchema.create({
        ...message,
        image:image
       })
       return res.status(201).json({message:newMessage})
    }catch(err){
        return res.status(500).json({message:"Went Wrong"})
    }
}

exports.getMessage=async(req,res)=>{
    try{
       const getMessage=await messageSchema.find({
        converesationId:req.params.id
       })

       return res.status(200).json({message:getMessage})
    }catch(err){
        return res.status(500).json({message:"Went Wrong"}) 
    }
}

