const express = require('express');
const router = express.Router();
const Buy = require('../controller/buyController')
const auth = require('../middleware/auth');
router.post('/buynow', auth.userProtect , Buy.post_buy);
module.exports = router