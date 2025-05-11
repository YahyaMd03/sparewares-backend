const Year = require('../../../model/admin_model/categories_Model/yearModel')

exports.addYear = async (req,res) =>{
    try{
        const {year} = req.body;
        if(!year){
            return res.status(404).json({Messgae:'Year is required'})
        }
        const newYear = await Year.create(req.body);
        return res.status(200).json({Mesage:'Successfully added'})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({Message:'Error in adding year'})
    }
   
}

exports.getAllYear = async (req,res) =>{
    try{
        const year = await Year.find({is_deleted : false})
        return res.status(200).json({Message:'ok' , data:year})
    }
    catch(err){
        console.log('error in getting year' , err)
        return res.status(500).json({Message:'Error in Getting year'})
    }
}

exports.updateYear = async (req,res) =>{
    try{
        const id = req.params.id
        if(!req.body){
            return res.status(400).json({Message:'Year is required'})
        }
        const year = await Year.findByIdAndUpdate(
            id,
            req.body,
            {new:true , runValidators:true}
        )
        if(!year){
            return res.status(400).json({Message:'Error in updating year'})
        }
        return res.status(200).json({Message:'Year successfully updated'})
    }
        catch(err){
            console.log(err)
            return res.status(500).json({Mssage:'Error in updating year'})
        }
    }

    exports.deleteYear = async (req,res) =>{
        try{
            const year = await Year.findByIdAndUpdate(
                req.params.id,
                {is_deleted:true},
                {new:true,runValidators:true}
            )
            if(!year){
                return res.status(400).json({Message:'cannot find with the given id'})
            }
            return res.status(200).json({Message:'ok'})
        }
        catch(err){
            console.log(err)
            return res.status(500).json({Message:'Error in deleting year'})
        }
    }