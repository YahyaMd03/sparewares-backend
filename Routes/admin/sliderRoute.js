const express = require('express')
const router = express.Router()
const sliderController = require('../../controller/admin/sliderController')
const {uploadPhoto} = require("../../middleware/bulkImage")
const { uploadToS3 } = require('../../utils/uploadToS3 ')
const upload = uploadToS3(process.env.S3_BUCKET_NAME)
router.post('/add', uploadPhoto.single('image'), sliderController.addSlider)
router.get('/get', sliderController.getSider)
router.post('/active', sliderController.activeSlider)
router.post('/deactive', sliderController.deactiveSlider)
router.post('/delete', sliderController.deleteSlider)

module.exports = router;