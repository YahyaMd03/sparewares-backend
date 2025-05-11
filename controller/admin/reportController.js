const User = require("../../model/user_model");
const Order = require("../../model/order_model");
const OrderItem = require("../../model/Order_items");
const Product = require("../../model/product_model");
const moment = require("moment");

// exports.CustomerDetails = async (req, res) => {
//     try {
//         const { fromDate, toDate } = req.query;

//         // Convert query params to Date objects if they exist
//         let query = { is_deleted: false };
//         if (fromDate || toDate) {
//             query.created_at = {};
//             if (fromDate) {
//                 query.created_at.$gte = new Date(fromDate);  // Greater than or equal to fromDate
//             }
//             if (toDate) {
//                 query.created_at.$lte = new Date(toDate);  // Less than or equal to toDate
//             }
//         }

//         const customers = await User.find(query);

//         for (let i = 0; i < customers.length; i++) {
//             const totalOrders = await Order.find({ user_id: customers[i]._id, is_deleted: false }).countDocuments();
//             if (totalOrders) {
//                 const customerObject = customers[i].toObject();
//                 customerObject.totalOrders = totalOrders;
//                 customers[i] = customerObject;
//             }
//         }

//         return res.status(200).json({ data: customers });
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({ Message: 'Error in getting customer details' });
//     }
// }

exports.CustomerDetails = async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;

    let query = { is_deleted: false };

    const isValidate = (dateString) => {
      const date = new Date(dateString);
      return !isNaN(date.valueOf());
    };

    if (fromDate || toDate) {
      query.createdAt = {};
      if (fromDate && isValidate(fromDate)) {
        query.createdAt.$gte = new Date(fromDate);
      }

      if (toDate && isValidate(toDate)) {
        query.createdAt.$lte = new Date(toDate);
      }
    }

    const customers = await User.find(query);

    for (let i = 0; i < customers.length; i++) {
      const totalOrders = await Order.find({
        user_id: customers[i]._id,
        is_deleted: false,
      }).countDocuments();
      if (totalOrders) {
        // Convert Mongoose document to JavaScript object
        const customerObject = customers[i].toObject();
        // Add object to customer
        customerObject.totalOrders = totalOrders;
        // Replace the Mongoose document instance with the plain object
        customers[i] = customerObject;
      }
    }

    return res.status(200).json({ data: customers });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ Message: "Error in getting customer details" });
  }
};

exports.filterCustomerDetails = async (req, res) => {
  try {
    const { fromDate, toDate } = req.body;
    if (!fromDate || !toDate) {
      return res
        .status(400)
        .json({ message: "Both fromDate and toDate are required" });
    }
    const fromDateUTC = moment.utc(fromDate, "YYYY-MM-DD");
    const toDateUTC = moment.utc(toDate, "YYYY-MM-DD");
    toDateUTC.endOf("day");
    const customers = await User.find({
      createdAt: { $gte: fromDateUTC, $lte: toDateUTC },
      is_deleted: false,
    });

    for (let i = 0; i < customers.length; i++) {
      const totalOrders = await Order.find({
        order_user_user_id: customers[i]._id,
        createdAt: { $gte: fromDateUTC, $lte: toDateUTC },
        is_deleted: false,
      }).countDocuments();
      console.log(totalOrders);
      if (totalOrders) {
        // Convert Mongoose document to JavaScript object
        const customerObject = customers[i].toObject();
        // Add object to customer
        customerObject.totalOrders = totalOrders;
        // Replace the Mongoose document instance with the plain object
        customers[i] = customerObject;
      }
    }
    return res.status(200).json({ data: customers });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error in getting customer details" });
  }
};

exports.productDetails = async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;

    let query = { is_deleted: false };
    const isValidate = (dateString) => {
      const date = new Date(dateString);
      return !isNaN(date.valueOf());

    };

    if (fromDate || toDate) {
      query.createdAt = {};

      if (fromDate && isValidate(fromDate)) {
        query.createdAt.$gte = new Date(fromDate);
      }

      if (toDate && isValidate(toDate)) {
        query.createdAt.$lte = new Date(toDate);
      }
    }

    const product = await Product.find(query);
    return res.status(200).json({ Message: "ok", data: product });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ Message: "Error in fetching product report" });
  }
};

exports.orderDetails = async (req, res) => {
  try {

    const{fromDate,toDate} = req.query;

    let query ={is_deleted:false};
    const isValidate = (dateString)=>{
      const date = new Date(dateString)
      return !isNaN(date.valueOf())
    }

    if(fromDate || toDate){
      query.createdAt={};

      if(fromDate && isValidate(fromDate)){
        query.createdAt.$gte= new Date(fromDate)
      }

      if(toDate && isValidate(toDate)){
        query.createdAt.$lte= new Date(toDate)
      }
    }

    const order = await Order.find(query);
    return res.status(200).json({ Message: "success", data: order });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ Message: "Error in order details" });
  }
};

exports.filterOrderDetails = async (req, res) => {
  try {
    const { fromDate, toDate } = req.body;
    if (!fromDate || !toDate) {
      return res
        .status(400)
        .json({ message: "Both fromDate and toDate are required" });
    }
    const fromDateUTC = moment.utc(fromDate, "YYYY-MM-DD");
    const toDateUTC = moment.utc(toDate, "YYYY-MM-DD");
    toDateUTC.endOf("day");
    const orders = await Order.find({
      createdAt: { $gte: fromDateUTC, $lte: toDateUTC },
      is_deleted: false,
    });
    return res.status(200).json({ data: orders });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error in getting customer details" });
  }
};

exports.orderItemDetails = async (req, res) => {
  try {
    const orderItem = await OrderItem.find();
    return res.status(200).json({ Message: "success", data: orderItem });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ Message: "Error in order details" });
  }
};

exports.filterOrderItemDetails = async (req, res) => {
  try {
    const { fromDate, toDate } = req.body;
    if (!fromDate || !toDate) {
      return res
        .status(400)
        .json({ message: "Both fromDate and toDate are required" });
    }
    const fromDateUTC = moment.utc(fromDate, "YYYY-MM-DD");
    const toDateUTC = moment.utc(toDate, "YYYY-MM-DD");
    toDateUTC.endOf("day");
    const orders = await OrderItem.find({
      createdAt: { $gte: fromDateUTC, $lte: toDateUTC },
      is_deleted: false,
    });
    return res.status(200).json({ data: orders });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error in getting customer details" });
  }
};
