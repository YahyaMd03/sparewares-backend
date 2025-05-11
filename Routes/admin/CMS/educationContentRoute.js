const express = require('express')
const router = express.Router();
const educationController = require('../../../controller/admin/CMS/educationContent')
const auth = require('../../../middleware/auth')


router.get('/fetch',educationController.fetchEducationContent)
router.post('/add',auth.adminProtect,educationController.addEducationContent)
router.put('/update',auth.adminProtect,educationController.updateEducationContent)
router.put('/delete',auth.adminProtect,educationController.deleteEducationContent)

module.exports = router 