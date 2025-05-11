const jwt = require('jsonwebtoken')
const util = require('util')
const Admin = require('../model/admin_model/adminModel')
const User = require('../model/user_model')
exports.adminProtect = async (req , res , next) =>{
    try{
        const headerToken = req.headers.authorization;
        let token;
        if(headerToken && headerToken.startsWith('Bearer')){
            token = headerToken.split(" ")[1]
        }
        if(!token){
            return res.status(400).json({Message:'Not login please login'})
        }

        const decodeToken = await util.promisify(jwt.verify)(
            token,
            process.env.SECRET_STRING
        )
        const admin = await Admin.findById(decodeToken._id)
        if(!admin){
            return res.status(404).json({Message:'Token does not match with the id'})
        }
        req.user = admin;
        next();
                                      
    }
    catch(err){
        if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
            return res.status(401).json({ Message: 'Invalid token. Authentication failed.' });
        }
        else{
            return res.status(400).json({Message:'error in admin protect'})
        }
    }
}

exports.userProtect = async (req , res , next) =>{
    try{
        const headerToken = req.headers.authorization;
        let token
        if(headerToken && headerToken.startsWith('Bearer')){
            token = headerToken.split(" ")[1]
        }
   
       

        if(!token){
            return res.status(400).json({Message:'Not login please login'})
        }

        const decodeToken = await util.promisify(jwt.verify)(
            token,
            process.env.SECRET_STRING
        )
        const user = await User.findById(decodeToken.id)
        if(!user){
            return res.status(404).json({Message:'Token does not match with the id'})
        }

        req.user = user;
        next();
        
    }
    catch(err){
        if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
            return res.status(401).json({ Message: 'Invalid token. Authentication failed.' });
        }
        else{
            return res.status(400).json({Message:'error in admin protect'})
        }
    }
}