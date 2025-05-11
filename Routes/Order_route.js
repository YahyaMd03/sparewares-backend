const express = require("express");
const router = express.Router();
const Order = require("../controller/Order_Controller");
const auth = require("../middleware/auth");
const returnRoute = require("../controller/returnController");

router.post("/Order_create", auth.userProtect, Order.orderCreate);
router.get("/Order_payment_id/:order_id", auth.userProtect, Order.getOrderDetails);
router.post("/checkout", auth.userProtect, Order.checkout);

router.post("/verify_order_signature", Order.verifySignature);
router.post("/Order_post", auth.userProtect, Order.create_Order);
router.get("/Order_fetch", Order.fetch_order);


router.get("/Order_fetch_by_id", Order.fetch_order_by_Id);
router.get("/Order_status", Order.fetch_status);
router.get("/customerOrder", auth.userProtect, Order.fetchOrderForCustomer);
router.get("/ordertable", auth.userProtect, Order.fetchOrderTable);
router.get("/orderitemstable", auth.userProtect, Order.fetchOrderItemsTable);
router.get("/fetchallorders", auth.adminProtect, Order.fetchAllOrders);
router.post("/updateorder", auth.adminProtect, Order.updateOrder);
router.post("/cancelorder", auth.userProtect, Order.updateOrder);
router.post(
  "/fetchfilerteredorder",
  auth.adminProtect,
  Order.fetchFilteredOrder
);

//routes for return
router.post("/addreturn", auth.userProtect, returnRoute.addReturn);
router.post("/updatereturnfora", auth.adminProtect, returnRoute.addReturnForA);
router.post("/updatereturnforc", auth.userProtect, returnRoute.addReturnForC);
router.get("/fetchreturn", auth.adminProtect, returnRoute.fetchReturns);
router.post("/fetchconvo", auth.adminProtect, returnRoute.fetchReturnConvo);
router.post("/fetchconvoforc", auth.userProtect, returnRoute.fetchReturnConvo);
router.post("/approveorreject", auth.adminProtect, returnRoute.approveOrReject);

module.exports = router;
