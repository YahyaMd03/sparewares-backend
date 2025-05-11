const express = require ('express')
const router = express.Router();
const pricing_details = require('../../../controller/admin/CMS/Pricing_details')
router.get('/get',pricing_details.getDetails)
router.put('/update',pricing_details.updateDetails)

module.exports = router 