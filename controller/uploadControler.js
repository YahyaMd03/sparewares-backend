exports.productImage = async(req , res)=>{
    const file = req.files;
    const url = file.map((file)=>file.filename);
    return res.status(200).json({url})
    }

exports.productUploadImage = async(req,res)=>{
    console.log(req.file)
    return res.status(200).json({Message:'Img uploaded successfully'})
}