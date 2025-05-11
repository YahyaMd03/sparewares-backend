const DelvierychargeSchmea=require("../../model/admin_model/Delivery/DeliverychargeModel")

class Delvierycharge{
    async Createdelivery (req,res){
        const {weight}=req.body
        const weightAlready=await DelvierychargeSchmea.findOne({weight})
        if(weightAlready){
            return res.status(400).json({message:"Weight is already exists"})
        }
        const newDeliveryCreate=await DelvierychargeSchmea.create(req.body)
        return res.status(200).json({message:"Delivery is create"})
    }
    async getdelivery (req,res){
    
        const weight=await DelvierychargeSchmea.find().sort({createdAt:-1,updatedAt:-1})
        
       
        return res.status(200).json({message:weight})
    }

    async Patchdelivery (req,res){
        const {id}=req.params
        const deliveryId=await DelvierychargeSchmea.findById(id)
        if(!deliveryId){
            return res.status(400).json({message:"Delivery charge is not found"})
        }
        const newDeliveryCreate=await DelvierychargeSchmea.findByIdAndUpdate(id,req.body,{new:true})
        return res.status(200).json({message:newDeliveryCreate})
    }

    async Deletedelivery (req,res){
        const {id}=req.params
        const deliveryId=await DelvierychargeSchmea.findById(id)
        if(!deliveryId){
            return res.status(400).json({message:"Delivery charge is not found"})
        }
        const newDeliveryCreate=await DelvierychargeSchmea.findByIdAndUpdate(id,{active:false},{new:true})
        return res.status(200).json({message:newDeliveryCreate})
    }


}

module.exports=Delvierycharge