const express = require("express");
const router = express.Router();
const image = require("../controller/imagecontroller");
const { uploadToS3 } = require("../utils/uploadToS3 ");

const {uploadPhoto} = require("../middleware/bulkImage")
const upload = uploadToS3(process.env.S3_BUCKET_NAME);
router.post("/image_post", upload.single("image"), image.create_image);
router.get("/image_get", image.fetch_image);
router.delete("/image_delete", image.delete_image);

router.post("/bulk-image" ,uploadPhoto.array("images",500),image.uploadBulkImage)


module.exports = router;
