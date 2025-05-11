const express = require ('express')
const router = express.Router();
const contact_us = require('../../../controller/admin/CMS/Contact_us')

router.get('/get',contact_us.getcontact)
router.put('/update',contact_us.updatecontact)

module.exports = router 