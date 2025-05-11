const Feedback = require('../../../model/admin_model/CMS/Feedback')

exports.addFeedback = async (req,res)=>{
    try{
        const newfeedback = await Feedback.create(req.body)
        return res.status(200).json({Message:'Successfully addedd'})
    }
    catch(e){
        console.log(e)
        return res.status(500).json({Message:'Error in adding feedback'})
    }
}

exports.fetchFeedback = async (req,res)=>{
    try{
        const feedback = await Feedback.find().sort({createdAt:-1})
        return res.status(200).json({data:feedback})
    }
    catch(e){
        console.log(e)
        return res.status(500).json({Message:'Error in fetching feedback'})
    }
}