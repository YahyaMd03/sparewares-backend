const express = require('express')
const router = express.Router()
const ReturnReason = require("../../../controller/admin/CMS/ReturnReason")


router.post('/add',ReturnReason.create_reason)
router.get('/get-reason',ReturnReason.getAll_reason)
router.get('/getone/:id',ReturnReason.get_reason)
router.put('/update-reason/:id',ReturnReason.update_reason)
router.delete('/delete-reason/:id',ReturnReason.delete_Reason)

module.exports = router