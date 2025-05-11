const Slider = require('../model/admin_model/Slider')


 exports.getSlider = async (req , res)=>{
    try{
        const slider = await Slider.find({active:true , is_deleted:false}).select("img_url , -_id").sort("sort_order")
        return res.status(200).json({data:slider})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({Message:'Error in getting slider'})
    }
}