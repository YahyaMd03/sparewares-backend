const bannerContentController = require("../../../controller/admin/CMS/aboutUs/bannerContent")
const subContentController = require("../../../controller/admin/CMS/aboutUs/subContent")
const mainContentController = require("../../../controller/admin/CMS/aboutUs/mainContent")
const bannerImageController = require("../../../controller/admin/CMS/aboutUs/bannerImaeg")
const authenticate = require("../../../middleware/auth")
const express = require('express')
const router = express.Router();
const {uploadToS3} = require("../../../utils/uploadToS3 ")
const upload = uploadToS3(process.env.S3_BUCKET_NAME)

//Routes for banner content
router.get("/getBannerContent" , authenticate.adminProtect , bannerContentController.getBannerContent)
router.post("/updateBannerContent" , authenticate.adminProtect , bannerContentController.updateBannerContent)

//Routes for sub content
router.get("/getSubContent",authenticate.adminProtect,subContentController.getSubContent)
router.post("/updateSubContent",authenticate.adminProtect,subContentController.updateSubContent)

//Routes for main content
router.get("/getMainContent" , authenticate.adminProtect,mainContentController.getMainContent)
router.post("/updateMainContent" , authenticate.adminProtect,mainContentController.updateMainContent)

//Routes for banner image
router.get('/getBannerImage',authenticate.adminProtect,upload.single('image'),bannerImageController.getBannerImage)
router.post('/updateBannerImage',authenticate.adminProtect,upload.single('image'),bannerImageController.createBannerImage)

module.exports = router;