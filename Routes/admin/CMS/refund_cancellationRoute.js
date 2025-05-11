const express = require ('express')
const router = express.Router();
const Refund = require('../../../controller/admin/CMS/refund_cancellationController')

router.get('/get',Refund.getRefund)
router.put('/update',Refund.updaterefund)

module.exports = router 