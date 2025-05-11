const jwt = require('jsonwebtoken');



 exports.sendUserToken = async (user,status_code,res) =>{
    const _id = user._id
    const token = jwt.sign({_id},process.env.SECRET_STRING,{expiresIn:process.env.EXPIRE_DAYS})
    return res.status(status_code).json({Message:'ok' , token , data:{user}})
}
