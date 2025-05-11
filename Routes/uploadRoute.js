const express = require('express')
const router = express.Router();
const multer = require('multer');
const uploadController = require('../controller/uploadControler')
const {uploadPhoto} = require('../middleware/uploadMiddleware')
const {uploadProductPhoto} = require('../middleware/upladProductImageMiddleware')
const exportMiddleware = require('../middleware/exportMiddleware')
const auth = require('../middleware/auth')


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./exportedData')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})


const upload = multer({ storage:storage });

router.post('/img-upload', uploadPhoto.array('image',9), uploadController.productImage);
router.post('/productImgupload',uploadProductPhoto.array('image'),uploadController.productUploadImage)
router.post('/exportdata',auth.adminProtect, upload.single('file') , exportMiddleware.exportMiddleware)
module.exports = router