const OrderModel = require("../model/order_model");
const Razorpay = require("razorpay");
const OrderItem = require("../model/Order_items");
const ProductModel = require("../model/product_model");
const User = require("../model/user_model");
const Cart = require("../model/cartModel");
const crypto = require("crypto");
// const KEY_ID = "rzp_test_momglBzxCVKXbZ";
// const KEY_SECRET = "dVVXRYdzJXOKSkfmGrQVSDzT";
const Financial = require("../model/admin_model/categories_Model/FinancialYear");
const { DateTime } = require("luxon");
const Notification = require("../model/admin_model/Notification");
const queryString = require("querystring");
const axios = require("axios");
const { smsApi } = require("../utils/sms");
const { Cashfree } = require("cashfree-pg");
// const CLIENT_ID = "TEST1019949234229486abd5ce8b2e7429499101";
// const CF_ENVIRONMENT = "https://sandbox.cashfree.com/pg/orders";

const CLIENT_ID = "691476129fedad4081717a5c2c674196";
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CF_ENVIRONMENT = process.env.CF_ENVIRONMENT;

function generateOrderId() {
  const unique = crypto.randomBytes(16).toString("hex");
  const hash = crypto.createHash("sha256");
  hash.update(unique);
  const orderId = hash.digest("hex");
  return orderId.substr(0, 12);
}

exports.orderCreate = async (req, res) => {
  try {
    const amount = parseFloat(req.body.amount); // Convert to float 66.01

    if (isNaN(amount) || amount <= 0) {
      throw new Error("Invalid amount specified");
    }

    const { _id, number, email, name } = req.user;

    const orderId = await generateOrderId();

    const orderDetails = {
      order_id: orderId,
      order_amount: amount.toFixed(2), // Ensure amount is formatted correctly
      order_currency: "INR",
      customer_details: {
        customer_id: _id,
        customer_phone: number,
        customer_name: name,
        customer_email: email,
      },
      order_meta: {
        notify_url: "https://webhook.site/beabb04d-6d16-4516-9b76-c58bf71a54ed",
      },
    };
    const headers = {
      "Content-Type": "application/json",
      "x-client-id": CLIENT_ID,
      "x-client-secret": CLIENT_SECRET,
      "x-api-version": "2023-08-01",
    };

    const response = await axios.post(CF_ENVIRONMENT, orderDetails, { headers });

    return res.status(200).json({ message: "Order created", data: response.data });
  } catch (error) {
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      response: error.response ? error.response.data : null,
    });

    res.status(500).json({
      message: "Error creating order",
      error: error.response ? error.response.data : error.message,
    });
  }
};

//getOne
exports.getOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.order_id;

    if (!orderId) {
      throw new Error("Order ID is required in the request parameters");
    }

    const headers = {
      "Content-Type": "application/json",
      "x-client-id": CLIENT_ID,
      "x-client-secret": CLIENT_SECRET,
      "x-api-version": "2023-08-01",
    };

    const response = await axios.get(`${CF_ENVIRONMENT}/${orderId}`, {
      headers,
    });

    return res
      .status(200)
      .json({ message: "Order details retrieved", data: response.data });
  } catch (error) {
    console.error(
      "Error fetching order details:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({
        message: "Error fetching order details",
        error: error.response ? error.response.data : error.message,
      });
  }
};

exports.checkout = (req, res) => {
  const paymentStatus = req.query.status;
  const orderId = req.query.orderId;

  if (paymentStatus === "success") {
    // Handle successful payment
    res.redirect("/order-success");
  } else {
    // Handle payment failure
    res.redirect("/order-failure");
  }
};

exports.verifySignature = (req, res) => {
  try {
    const {
      orderId,
      orderAmount,
      referenceId,
      txStatus,
      paymentMode,
      txMsg,
      txTime,
      signature,
    } = req.body;

    const data =
      orderId +
      orderAmount +
      referenceId +
      txStatus +
      paymentMode +
      txMsg +
      txTime;
    const expectedSignature = crypto
      .createHmac("sha256", CLIENT_SECRET)
      .update(data)
      .digest("hex");

    if (expectedSignature === signature) {
      return res.status(200).send({ code: 200, message: "Signature Valid" });
    } else {
      return res.status(500).send({ code: 500, message: "Signature Invalid" });
    }
  } catch (error) {
    console.error("Error verifying signature:", error.message);
    res.status(500).json({
      message: "Error verifying signature",
      error: error.message,
    });
  }
};

const generateInvoiceNumber = async () => {
  try {
    const invYear = await Financial.findOne({ status: true });
    const lastOrder = await OrderModel.findOne({}).sort({ date: -1 });
    let nextValue;
    if (lastOrder) {
      const digit = lastOrder.order_invno;
      const lastSixDigits = digit.substring(digit.length - 6);
      let paddedNextValue = parseInt(lastSixDigits, 10) + 1;
      nextValue = paddedNextValue.toString().padStart(6, "0");
    } else {
      nextValue = "000001";
    }
    const invoice = "INV-" + invYear.format + "-" + nextValue;
    return invoice;
  } catch (err) {
    console.log(err);
  }
};

const generateOrderNumber = async () => {
  try {
    const lastOrder = await OrderModel.findOne({}).sort({ date: -1 });
    if (lastOrder) {
      const digit = lastOrder.orderNumber.toString();
      const lastSixDigits = digit.substring(digit.length - 6);
      let paddedNextValue = parseInt(lastSixDigits, 10) + 1;
      nextValue = paddedNextValue.toString().padStart(6, "0");
    } else {
      nextValue = "000001";
    }
    const orderNumber = "SWO-" + nextValue;
    return orderNumber;
  } catch (e) {
    console.log(e);
  }
};

exports.create_Order = async (req, res) => {
  try {
    const { _id, name, customerId, number } = req.user;
    const {
      products,
      selectedAddress,
      b_country,
      b_fname,
      b_lname,
      b_address,
      b_address2,
      b_city,
      b_state,
      b_number,
      b_pincode,
      s_country,
      s_fname,
      s_lname,
      s_address,
      s_address2,
      s_city,
      s_pincode,
      s_state,
      s_number,
      shippingFee,
      subtotal,
      total_weight,
      transectionId,
      paymentType,
      defaultAddress,
    } = req.body;
    let orderId;
    let orderNumberDB;
    let customerName;
    let customerNumber;

    if (selectedAddress) {
      const user = await User.findOne({ _id });
      const billingAddressData = user.billing_address[0];
      orderData = {
        billing_address: { ...billingAddressData },
        shipping_address: selectedAddress,
      };
    } else {
      orderData = {
        billing_address: {
          b_country,
          b_fname,
          b_lname,
          b_address,
          b_address2,
          b_city,
          b_state,
          b_pincode,
          b_number,
        },
        shipping_address: {
          s_country,
          s_fname,
          s_lname,
          s_address,
          s_address2,
          s_city,
          s_state,
          s_pincode,
          s_number,
          default: defaultAddress,
        },
      };
      await User.findOneAndUpdate({ _id }, { $set: orderData });
    }

    const invoiceNumber = await generateInvoiceNumber();
    const orderNumber = await generateOrderNumber();
    const isSameState = selectedAddress
      ? selectedAddress.s_state === orderData.billing_address.b_state
      : orderData.billing_address.b_state ===
      orderData.shipping_address.s_state;
    let CGST = 0;
    let SGST = 0;
    let IGST = 0;

    const totalAmountForOrder = shippingFee + subtotal;
    const postOrder = await OrderModel.create({
      user_id: _id,
      customerId: customerId,
      user_name: name,
      billing_address: orderData.billing_address,
      shipping_address: orderData.shipping_address,
      order_invno: invoiceNumber,
      orderNumber: orderNumber,
      order_total_cgst: CGST,
      order_total_sgst: SGST,
      order_total_igst: IGST,
      order_total_product_price: subtotal,
      order_shipping_fee: shippingFee,
      total_weight: total_weight,
      order_total_amount: totalAmountForOrder,
      total_products: products.length,
      paymentType: paymentType,
      transectionId: transectionId,
      customerId: customerId,
    });
    orderId = postOrder._id;
    orderNumberDB = postOrder.orderNumber;
    customerName = postOrder.user_name;
    customerNumber = postOrder.customerId;

    const orderItems = [];
    let total_items = 0;
    for (const product of products) {
      total_items = total_items + product.quantity;
      const totalAmount = product.price * product.quantity;
      let cgstValue = 0;
      let sgstValue = 0;
      let igstValue = 0;
      let cgstPercent = 0;
      let sgstPercent = 0;
      let igstPercent = 0;
      let totalgst = 0;
      if (isSameState) {
        cgstValue = (totalAmount * (product.gst / 2 / 100)).toFixed(2);
        sgstValue = (totalAmount * (product.gst / 2 / 100)).toFixed(2);
        CGST += parseFloat(cgstValue);
        SGST += parseFloat(sgstValue);
        totalgst = (parseFloat(cgstValue) + parseFloat(sgstValue)).toFixed(2);
        cgstPercent = product.gst / 2;
        sgstPercent = product.gst / 2;
      } else {
        igstValue = (totalAmount * (product.gst / 100)).toFixed(2);
        IGST += parseFloat(igstValue);
        totalgst = parseFloat(igstValue).toFixed(2);
        igstPercent = product.gst;
      }
      const orderItemData = {
        order_id: orderId,
        product_id: product.product_id,
        part_number: product.part_number,
        order_product_name: product.product_name,
        order_item_amount: product.price,
        order_item_qty: product.quantity,
        order_total_amount: totalAmount,
        order_cgst_percent: cgstPercent,
        order_sgst_percent: sgstPercent,
        order_igst_percent: igstPercent,
        order_cgst_value: cgstValue,
        order_sgst_value: sgstValue,
        order_igst_value: igstValue,
        order_total_gst: totalgst,
        orderNumber: orderNumberDB,
        customerName: customerName,
        customerNumber: customerNumber,
      };
      const orderItem = await OrderItem.create(orderItemData);

      if (orderItem) {
        smsApi(
          number,
          `[SpareWares.com] Your order ${orderItem?._id}  has been confirmed! Crafty components `,
          "1007731108068610180"
        );
      }

      await Cart.deleteMany({ cart_user_user_Id: _id });
      await ProductModel.findByIdAndUpdate(orderItem.product_id, {
        $inc: { sales: orderItem.order_item_qty },
      });
    }
    await OrderModel.findByIdAndUpdate(orderId, {
      order_total_cgst: CGST,
      order_total_sgst: SGST,
      order_total_igst: IGST,
      total_items: total_items,
    });
    await Notification.create({ type: "order" });
    return res.status(200).json({ success: true, orderItemsList: orderItems });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.fetch_order = async (req, res) => {
  try {
    const Order = await OrderItem.find({ is_deleted: false });
    const Orders = await OrderModel.find({ is_deleted: false });
    if (!Order || Order.length === 0) {
      return res.status(204).json({ Message: "No result found" });
    }
    return res
      .status(200)
      .json({ Message: "Succes", Orders_item: Order, Orders: Orders });
  } catch (err) {
    console.log("Error in fecthing product", err);
    return res
      .status(500)
      .json({ Message: "Error in fetching product", Error: err });
  }
};

exports.fetch_status = async (req, res) => {
  try {
    const Order = await OrderItem.find({
      status: "pending",
      is_deleted: false,
    });
    const Orders = await OrderModel.find({ is_deleted: false });
    if (!Order || Order.length === 0) {
      return res.status(204).json({ Message: "No result found" });
    }
    return res
      .status(200)
      .json({ Message: "Succes", Orders_item: Order, Orders: Orders });
  } catch (err) {
    return res
      .status(500)
      .json({ Message: "Error in fetching product", Error: err });
  }
};

exports.fetch_order_by_Id = async (req, res) => {
  try {
    const { orderId } = req.query;
    const order = await OrderModel.find({ _id: orderId });
    const orderItems = await OrderItem.find({ order_id: orderId });
    const customerDetails = await User.find({ _id: order[0].user_id });

    return res.status(200).json({
      Message: orderItems.length,
      order: order,
      OrderItems: orderItems,
      customerDetails: customerDetails,
    });
  } catch (err) {
    console.log("Error in fecthing product", err);
    return res
      .status(500)
      .json({ Message: "Error in fetching product", Error: err.message });
  }
};

exports.fetchOrderForCustomer = async (req, res) => {
  try {
    let productDetails = [];
    const { _id } = req.user;
    let totalOrders = {};
    const orderId = await OrderModel.find({ user_id: _id, is_deleted: false });

    for (let i = 0; i < orderId.length; i++) {
      let productInformation = [];
      const productId = await OrderItem.find({ order_id: orderId[i] });

      for (let j = 0; j < productId.length; j++) {
        const product_details = await ProductModel.find({
          _id: productId[j].product_id,
        }).select("product_name price mrp images");
        productInformation.push(product_details);
      }

      totalOrders[orderId[i]._id] = productInformation;
    }

    productDetails.push(totalOrders);

    return res.status(200).json({ Message: "Success", data: productDetails });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ Message: "Erro in fetching order for customer " });
  }
};

exports.fetchOrderTable = async (req, res) => {
  try {
    const { _id } = req.user;
    const order = await OrderModel.find({
      user_id: _id,
      is_deleted: false,
    }).sort({ createdAt: -1 });
    return res.status(200).json({ data: order });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ Message: "Error in fetching fetch order table" });
  }
};

exports.fetchOrderItemsTable = async (req, res) => {
  try {
    const { _id } = req.user;
    const orderId = req.query.orderId;
    const orders = await OrderItem.find({ order_id: orderId }).populate(
      "product_id"
    );
    res.status(200).json({ data: orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ Message: "Error in fetching order items table" });
  }
};
exports.fetchAllOrders = async (req, res) => {
  try {
    const allOrders = await OrderModel.find().sort({ createdAt: -1 }).exec();
    return res.status(200).json({ data: allOrders });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: "Error in fetching all orders" });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { number } = req.user;
    const { id, update } = req.body;

    const currentDate = DateTime.now().setZone("Asia/Kolkata").toJSDate();
    const formattedDateTime = currentDate.toLocaleString("en-IN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    const updateOrder = await OrderModel.findByIdAndUpdate(id, {
      status: update,
      customUpdateTime: formattedDateTime,
    }).populate("user_id");

    if (update === "cancelled") {
      smsApi(
        number,
        `[SpareWares.com] Your order  has been cancelled. For more details, check your email. Crafty components`,
        "1007992485526663075"
      );
    }

    if (update === "delivered") {
      smsApi(
        updateOrder?.user_id.number,
        `[SpareWares.com] Your order ${updateOrder?._id.toString()} has been delivered. Thank you for shopping with us! Crafty components`,

        "1007151010418928666"
      );
    }
    return res.status(200).json({ Message: `order ${update} successfully` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Mesage: "Error in updating order" });
  }
};

exports.fetchFilteredOrder = async (req, res) => {
  try {
    const { status } = req.body;
    const fetchFilteredOrder = await OrderModel.find({ status: status });
    return res.status(200).json({ order: fetchFilteredOrder });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ Message: "Error in fintered serch order" });
  }
};
