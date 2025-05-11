const express = require('express')
const router = express.Router()

const WishList = require('../controller/wish_listController')

router.post('/add', WishList.addWishList)
router.get('/get', WishList.getSpecificWishlist)
router.delete('/delete', WishList.deleteWishlist)

module.exports = router

