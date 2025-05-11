const express = require('express');
const router = express.Router()
const productcontroller = require('../controller/product_controller')
const Ratings = require('../controller/admin/CMS/ratingsReviewsController')
const auth = require('../middleware/auth')
const { upload } = require("../utils/multermiddleware");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + "-" + file.originalname;
    cb(null, filename);
  },
});

const uploads = multer({ storage: storage });
router.post('/addproduct', upload.array("images", 5), productcontroller.addproduct);
router.get('/getallproduct', productcontroller.getallproduct)
router.get('/getproductId/:id', productcontroller.getproductId)
router.get('/search-limit-getallproduct/:value', productcontroller.getSearchProduct)

router.get('/getrating', auth.userProtect, productcontroller.fetchRatingProduct)
// router.post('/filterproduct', productcontroller.filteredProduct) 
router.get("/search-things",productcontroller.searchThings)
router.post('/fetchsearchbyvehicle', productcontroller.fetchSearchByVehicle)
router.get('/searchProduct', productcontroller.searchProduct)
router.post('/fetchproductforcategory', productcontroller.fetchForCategory)
router.get("/searchproductSuggest",productcontroller.getSearchProduct)

router.put('/updateproduct/:id', auth.adminProtect, productcontroller.updateproduct)
router.delete('/deleteproduct/:id', auth.adminProtect, productcontroller.deleteuser)
router.get('/getallrating', auth.adminProtect, Ratings.getRating)
router.post('/getspecificrating', auth.adminProtect, Ratings.fetchRatingProduct)
router.post('/deleterating', auth.adminProtect, Ratings.deleteRating)

router.put("/updateImage/:id", upload.array("images", 5), productcontroller.uploadImageUpdate);
router.delete("/deleteproduct/:id", auth.adminProtect, productcontroller.deleteuser);

router.put("/addrating", uploads.array("image", 10), auth.userProtect, productcontroller.addRatings);
router.post("/deleteImage", productcontroller.deleteImage);
router.get("/mostselled", productcontroller.mostproduct);
router.get("/top_categories", productcontroller.topcategory);
router.get("/top_ratings", productcontroller.topratings);
router.get("/top_manufacture", productcontroller.topManufacture);
router.get("/newly_added", productcontroller.newly_added);
router.get("/stockclearence", productcontroller.fetchStockClearenceProduct);
router.get("/searched_items",auth.userProtect,  productcontroller.searched_items)
module.exports = router;
