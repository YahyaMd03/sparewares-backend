const Contact_us = require('../../../model/admin_model/CMS/Contact_us')
exports.getcontact = async (req,res) =>{
    try{
        const data = await Contact_us.find()
        return res.status(200).json({"Message":"success","data":data})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({"Message":"Error in getting"})
    }
    
}

exports.updatecontact= async (req,res) =>{
    try{
        const {content} = req.body
        const updated = await Contact_us.findOneAndUpdate({}, { content }, { new: true });
        if (!updated) {
            await Contact_us.create(req.body);
        }
        return res.status(200).json({Message:'Successfully updated'})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({Message:'Error in updating'})
    }
}
