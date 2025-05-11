const express = require('express');
const router = express.Router();
const GST = require('../controller/Gst_controller')

router.post('/GST_post',GST.create_GST);
router.get('/GST_fetch',GST.fetch_GST);
router.get('/GST_fetch/:id',GST.fetch_GST_id);
router.put('/update_GST/:id',GST.update_GST);
router.delete('/delete_GST/:id',GST.delete_GST);
module.exports = router