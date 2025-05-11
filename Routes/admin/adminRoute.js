const express = require('express');
const router = express.Router();

const adminController = require('../../controller/admin/loginController')
const {adminProtect} = require("../../middleware/auth")

router.post('/addAdmin',adminController.addAdmin);
router.post('/adminLogin' , adminController.login)
router.get("/get-admin",adminProtect,adminController.getAdmin)


module.exports = router