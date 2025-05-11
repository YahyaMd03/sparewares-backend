const express = require('express');
const router = express.Router();
const manufacture = require("../../../controller/admin/categories_Controllers/Manufacture")
const multer = require('multer');
const { uploadToS3 } = require('../../../utils/uploadToS3 ')
const upload = uploadToS3(process.env.S3_BUCKET_NAME)

router.post('/manufacture_post', upload.single('image'), manufacture.manufacture_post);
router.put('/update_manufacture/:id', upload.single('image'), manufacture.update_manufacture_id);
router.get('/manufacture_fetch', manufacture.manufacture_fetch);
router.get('/manufacture_fetch/:id', manufacture.manufacture_fetch_id);
router.delete('/delete_manufacture/:id', manufacture.delete_manufacture);
module.exports = router