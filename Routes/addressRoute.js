const express = require('express');
const router = express.Router();
const Address = require('../controller/addressController')
const auth = require('../middleware/auth')
router.get('/fetch_address',auth.userProtect, Address.fetch_address);
router.post('/post_address', auth.userProtect, Address.post_address);
router.get('/get_address/:id',Address.address_edit);
router.patch('/update_address/:id',auth.userProtect, Address.address_update);
router.delete('/delete_address/:id',auth.userProtect, Address.address_delete);
module.exports = router