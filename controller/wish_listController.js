const WishList = require('../model/wishListModel')


exports.addWishList = async (req,res) =>{
    try{
        const {user_id , product_id} = req.body
        if(!user_id || !product_id){
            return res.status(404).json({'Message':'All fields manditory'})
        }
        const wishlist = await WishList.create(req.body);
        return res.status(201).json({'Message':'Wishlist has been added'})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({'Message':"Erro in adding wishlist"})
    }
}

exports.getSpecificWishlist = async (req,res)=>{
    try{
        const {user_id} = req.body;
        const wishlist = await WishList.findOne({user_id:user_id , is_deleted:false})
        return res.status(200).json({"Message":"Success","data":wishlist})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({'Message':'error in getting wishlist'})
    }
}

exports.deleteWishlist = async (req,res) =>{
    try{
        const {user_id , product_id} = req.body;
        const deletedwishlist = await WishList.findOneAndUpdate({user_id:user_id , product_id:product_id},{is_deleted:true})
        return res.status(200).json({"message":"Successfully deleted wishlist"})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({"Message":"Error in deleting wishlist"})
    }
}