const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const financialController = require('../controller/admin/financialController')



router.post('/addfinancialyear' , auth.adminProtect ,financialController.addFinancialYear ) 
router.get('/getfinancialyear',auth.adminProtect,financialController.getFinancialYear)
router.put('/updatefinancialyear',auth.adminProtect,financialController.updateFinancialYear)
router.post('/deletefinancialyear',auth.adminProtect,financialController.deleteFinancialYear)
module.exports = router