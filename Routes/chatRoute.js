const express = require('express');
const router = express.Router();
const chatController = require('../controller/chatController')
const auth = require('../middleware/auth')

router.post('/addchat', chatController.addChat);
router.get('/getAllchat', auth.adminProtect, chatController.getAllChats)
router.get('/getSpecificchat', chatController.getSpecificChat)
router.get('/getChatAssistant/:id', chatController.getChatAssistant)
router.post('/blockcustomer', auth.adminProtect, chatController.blockCustomer)
router.post('/unblockcustomer', auth.adminProtect, chatController.unBlockCustomer)
router.put('/deletecustomer', auth.adminProtect, chatController.deleteCustomer)
module.exports = router