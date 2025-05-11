const Education = require('../../../model/admin_model/CMS/EducationContent')

exports.addEducationContent = async (req,res)=>{
    try{
        const newEducation = await Education.create(req.body)
        return res.status(200).json({Message:'Successfully addedd'})
    }
    catch(e){
        console.log(e)
        return res.status(500).json({Message:'Error in adding education content'})
    }
}

exports.fetchEducationContent = async (req,res)=>{
    try{
        const educationContent = await Education.find({is_deleted:false})
        return res.status(200).json({data:educationContent})
    }
    catch(e){
        console.log(e)
        return res.status(500).json({Message:'Error in fetching education content'})
    }
}

exports.updateEducationContent = async (req,res) =>{
    try{
        const {id , title,desc,image} = req.body
        const updateEducationContent = await Education.findByIdAndUpdate(id,{title:title , desc:desc , image:image})
        return res.status(200).json({Message:'Updated successfully'})
    }
    catch(e){
        console.log(e)
        return res.status(500).json({Message:'Erro in updating education content'})
    }
    
}


exports.deleteEducationContent = async (req,res) =>{
    try{
        const {id} = req.body
        const updateEducationContent = await Education.findByIdAndUpdate(id,{is_deleted:true})
        return res.status(200).json({Message:'Updated successfully'})
    }
    catch(e){
        console.log(e)
        return res.status(500).json({Message:'Erro in updating education content'})
    }
    
}