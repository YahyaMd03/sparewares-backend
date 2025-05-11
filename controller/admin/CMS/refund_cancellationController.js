const Refund = require('../../../model/admin_model/CMS/RefundCancellation')

exports.getRefund = async (req,res) =>{
    try{
        const data = await Refund.find()
        return res.status(200).json({"Message":"success","data":data})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({"Message":"Error in getting refund and cancellation"})
    }
    
}

exports.updaterefund = async (req,res) =>{
    try{
        const {content} = req.body
        const updatedRefund = await Refund.findOneAndUpdate({}, { content }, { new: true });
        if (!updatedRefund) {
            await Refund.create(req.body);
        }
        return res.status(200).json({Message:'Successfully updated'})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({Message:'Error in updating refund and cancellation'})
    }
}
