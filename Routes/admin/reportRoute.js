const express = require('express')
const router = express.Router();

const reportController = require('../../controller/admin/reportController')

//Customer report
router.get('/getCustomerDetails',reportController.CustomerDetails)
router.post('/getFilteredCustomerDetails',reportController.filterCustomerDetails)

//Product report
router.get('/getProductDetails',reportController.productDetails)

//Order report
router.get('/getorderDetails',reportController.orderDetails)
router.post('/getFilteredOrderDetails',reportController.filterOrderDetails)

//Order item report
router.get('/getorderItemDetails',reportController.orderItemDetails)
router.post('/getFilteredOrderItemDetails',reportController.filterOrderItemDetails)

module.exports = router