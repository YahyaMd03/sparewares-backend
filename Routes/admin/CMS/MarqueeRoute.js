const express = require('express')
const router = express.Router()
const MarqueeController = require('../../../controller/admin/CMS/MarqueeController')

router.post('/add',MarqueeController.create_category)
router.get('/get-tag',MarqueeController.fetch_category)
router.delete('/delete-tag/:id',MarqueeController.delete_category)

module.exports = router 