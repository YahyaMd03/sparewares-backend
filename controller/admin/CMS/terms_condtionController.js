const TermsCondtition = require('../../../model/admin_model/CMS/TermsCondition')

exports.getTermsAndCondition = async (req,res) =>{
    try{
        const data = await TermsCondtition.find()
        return res.status(200).json({"Message":"success","data":data})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({"Message":"Error in getting Trems and condition"})
    }
    
}

exports.updateTermsAndCondition = async (req,res) =>{
    try{
        const {content} = req.body
        const updatedTermsCondition = await TermsCondtition.findOneAndUpdate({}, { content }, { new: true });
        if (!updatedTermsCondition) {
            await TermsCondtition.create(req.body);
        }
        return res.status(200).json({Message:'Successfully updated'})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({Message:'Error in updating terms and condtion'})
    }
}
