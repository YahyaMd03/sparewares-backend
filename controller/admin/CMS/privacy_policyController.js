const Policy= require('../../../model/admin_model/CMS/PrivacyPolicy')

exports.getPolicy= async (req,res) =>{
    try{
        const data = await Policy.find()
        return res.status(200).json({"Message":"success","data":data})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({"Message":"Error in getting policy"})
    }
    
}

exports.updatePolicy= async (req,res) =>{
    try{
        const {content} = req.body
        const updatedprivacy = await Policy.findOneAndUpdate({}, { content }, { new: true });
        if (!updatedprivacy) {
            await Policy.create(req.body);
        }
        return res.status(200).json({Message:'Successfully updated'})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({Message:'Error in updating policy'})
    }
}
