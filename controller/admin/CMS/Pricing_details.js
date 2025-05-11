const Pricing = require('../../../model/admin_model/CMS/Pricing_details')

exports.getDetails= async (req,res) =>{
    try{
        const data = await Pricing.find()
        return res.status(200).json({"Message":"success","data":data})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({"Message":"Error in getting policy"})
    }
    
}

exports.updateDetails= async (req,res) =>{
    try{
        const {content} = req.body
        const updatedpricing = await Pricing.findOneAndUpdate({}, { content }, { new: true });
        if (!updatedpricing) {
            await Pricing.create(req.body);
        }
        return res.status(200).json({Message:'Successfully updated'})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({Message:'Error in updating policy'})
    }
}
