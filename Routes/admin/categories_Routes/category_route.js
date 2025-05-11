require('dotenv').config();
const express = require('express')
const router = express.Router();
const categorycontroler = require('../../../controller/admin/categories_Controllers/category_Controller')
const { uploadToS3 } = require('../../../utils/uploadToS3 ')
const upload = uploadToS3(process.env.S3_BUCKET_NAME)
router.post('/create_category', upload.single('image'), categorycontroler.create_category);
router.get('/fetch_category', categorycontroler.fetch_category);
router.get('/fetch_category/:id', categorycontroler.fetch_category_id);
router.put('/update_category/:id', upload.single('image'), categorycontroler.update_category);
router.delete('/delete_category/:id', categorycontroler.delete_category);

module.exports = router;
