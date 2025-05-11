const express = require ('express')
const router = express.Router();
const Shipping_policy = require('../../../controller/admin/CMS/Shipping_policy')

router.get('/get',Shipping_policy.getShippingPolicy)
router.put('/update',Shipping_policy.updateShippingPolicy)

module.exports = router 