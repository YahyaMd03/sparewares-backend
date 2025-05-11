const express = require('express');
const router = express.Router();
const Cart = require('../controller/cartController');
const auth = require('../middleware/auth');


router.post('/cart_add', auth.userProtect, Cart.create_cart);
router.get('/cart_get',Cart.fetch_cart);
router.get('/cart_getbyid',auth.userProtect,Cart.fetch_cart_id);
router.get('/cart_exists',auth.userProtect, Cart.checkcartexists);
router.put('/cart_qauntity', Cart.cart_quantity)
router.delete('/delete_cart', auth.userProtect, Cart.delete_cart);
router.delete('/delete_cart_id/:id',Cart.update_cart);
module.exports = router