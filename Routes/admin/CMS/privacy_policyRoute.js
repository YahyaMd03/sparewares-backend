const express = require ('express')
const router = express.Router();
const Privacy = require('../../../controller/admin/CMS/privacy_policyController')

router.get('/get',Privacy.getPolicy)
router.put('/update',Privacy.updatePolicy)

module.exports = router 