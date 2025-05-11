const express = require ('express')
const router = express.Router();
const TermsAndCondition = require('../../../controller/admin/CMS/terms_condtionController')

router.get('/get',TermsAndCondition.getTermsAndCondition)
router.put('/update',TermsAndCondition.updateTermsAndCondition)

module.exports = router 