const Return = require("../model/Return");
const ReturnDetails = require("../model/ReturnDetails");
const OrderItem = require("../model/Order_items")
const Notification = require('../model/admin_model/Notification')


exports.addReturn = async (req, res) => {
  try {
    //data from customer
    const { _id, customerId, name } = req.user;
    const {
      orderId,
      orderItemId,
      orderNumber,
      productId,
      productName,
      orderedAt,
      productPartNumber,
      productPrice,
      productImage,
      quantity,
      reason,
      message,
      images,
    } = req.body;

    //Calculating for current date and time
    const currentDate = new Date().toLocaleString("en-IN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    
    //Creation for return table
    const newReturn = await Return.create({
      orderId: orderId,
      orderNumber: orderNumber,
      orderItemId: orderItemId,
      customerId: _id,
      customerNumber: customerId,
      orderedAt: orderedAt,
      customerName: name,
      productId: productId,
      productName: productName,
      productPartNumber: productPartNumber,
      productPrice: productPrice,
      productImage: productImage,
      quantity: quantity,
      returnedAt:currentDate
    });
    const returnId = newReturn._id.toString();
    
    //updating order item table
    await OrderItem.findByIdAndUpdate(orderItemId , {return:"processing" ,returnId:returnId, return_quantity:quantity})

    //creation for retunDtail table
    const conversation = [
      {
        reason: reason,
        message: message,
        images: images,
        updatedAt: currentDate,
      },
    ];
    await ReturnDetails.create({
      returnId: returnId,
      conversation: conversation,
    });

    //adding in notification table
    await Notification.create({type:'return'})
    //returning the response
    return res.status(200).json({ Message: "Success" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ Message: "Error in adding return" });
  }
};

exports.addReturnForA = async (req, res) => {
  try {
    const { returnId, reason, message } = req.body;
    const currentDate = new Date().toLocaleString("en-IN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    const returnDetail = await ReturnDetails.updateOne(
      { returnId: returnId },
      {
        $push: {
          conversation: {
            reason: reason,
            message: message,
            commentedBy: "admin",
            updatedAt: currentDate,
          },
        },
      }
    );
    return res.status(200).json({ Message: "Updated successfully" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ Message: "Erro in updating return" });
  }
};

exports.addReturnForC = async (req, res) => {
  try {
    const { returnId, reason, message, images } = req.body;

    const currentDate = new Date().toLocaleString("en-IN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    const returnDetail = await ReturnDetails.updateOne(
      { returnId: returnId },
      {
        $push: {
          conversation: {
            reason: reason,
            message: message,
            images: images,
            commentedBy: "customer",
            updatedAt: currentDate,
          },
        },
      }
    );
    return res.status(200).json({ Message: "Updated successfully" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ Message: "Erro in updating return" });
  }
};

exports.fetchReturns = async (req, res) => {
  try {
    const returnData = await Return.find().sort({ createdAt: -1 });
    return res.status(200).json({ returnData: returnData });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ Message: "Error in fetching returns" });
  }
};

exports.fetchReturnConvo = async (req, res) => {
  try {
    const { returnId } = req.body
    const returnData = await Return.findOne({_id:returnId})
    const convo = await ReturnDetails.findOne({ returnId: returnId })
    return res.status(200).json({ convo: convo , returnData:returnData})
  }
  catch (e) {
    console.log(e)
    return res.status(500).json({ Message: 'Error in fetching return conversation' })
  }
}

exports.approveOrReject = async (req,res)=>{
  try{
    const {returnId , status} = req.body

     //Calculating for current date and time
     const currentDate = new Date().toLocaleString("en-IN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    await Return.findByIdAndUpdate(returnId , {status:status , approvedOrRejectAt:currentDate})
    await OrderItem.findOneAndUpdate({returnId:returnId} , {return:status})
    return res.status(200).json({Message:'Return updated successfully'})
  }
  catch(e){
  console.log(e)
  return res.status(500).json({Message:'Erro in approve or reject function'})
}
}