const Financial = require('../../model/admin_model/categories_Model/FinancialYear')

exports.addFinancialYear = async(req,res)=>{
    try{
        const {start , end} = req.body
        const existingFinancial = await Financial.findOne({start: start });
        if(existingFinancial){
            return res.status(200).json({Message:'Year allready exist'})
        }
        if(end-start !== 1 || start == end){
            return res.status(200).json({Message:'Invalid start and end year'})
        }
        const newFinancial = await Financial.create(req.body)
        return res.status(201).json({Message:'Successfully created'})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({Message:'Error in adding financial year'})
    }
}

exports.getFinancialYear = async(req,res)=>{
    try{
        const year = await Financial.find({is_deleted:false})
        return res.status(200).json({data:year})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({Message:'Error in getting financial year'})
    }
}

exports.updateFinancialYear = async (req,res)=>{
    try{
        const{ id} = req.body
        const existActiveYear = await Financial.findOneAndUpdate({status:true} , {status:false} )

        const updatefinancialyear = await Financial.findByIdAndUpdate(id , {status:true},{new:true})
        return res.status(200).json({Message:'updated successfully'})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({Message:'Error in updating year'})
    }
}

exports.deleteFinancialYear = async (req , res) =>{
    try{
        const {id} = req.body
        const activityCheck = await Financial.findOne({_id:id, status:true})
        if(activityCheck){
            return res.status(200).json({Message:'Sorry u cant delete the active year'})
        }
        const deleteyear = await Financial.findByIdAndUpdate(id,{is_deleted:true})
        return res.status(200).json({Message:'deleted successfully'})
    }
    catch(err){
        console.log(err)
        return res.status(500).jsin({Message:'error in deleteing financial year'})
    }
}