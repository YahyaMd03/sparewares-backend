const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router();
const usercontroler = require('../controller/user_controller')
const sliderController = require('../controller/sliderController')
const contactUsController = require("../controller/contactUsController");

const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  const upload = multer({ storage: storage });

router.post("/jobcreate",upload.single("file"),contactUsController.createjob)
router.post('/createUser',usercontroler.createUser);
router.get('/fetchuser',auth.userProtect,usercontroler.fetchuser);
router.post('/login',usercontroler.login);
router.put('/updateuser',auth.userProtect,usercontroler.updateUser);
router.post('/forgotpassword',usercontroler.forgotPassword)
router.post('/logout',auth.userProtect,usercontroler.logout)
router.get('/getspecificaddress' ,auth.userProtect, usercontroler.getSpecificAddress)
router.put('/activateaddress' ,auth.userProtect, usercontroler.activateDefaultAddress)
//For wishlist
router.post('/user_wishList',auth.userProtect,usercontroler.addWishList)
router.get('/user_wishList',auth.userProtect,usercontroler.getWishList)
router.post('/deleteallwishlist', auth.userProtect , usercontroler.deleteAllWishList)
router.post('/usersearch', auth.userProtect, usercontroler.usersearch )
router.post('/existemail',usercontroler.existEmail)
router.post('/existnumber',usercontroler.existnumber)
router.get('/sliderget',sliderController.getSlider)

//for contactUs
router.post("/createmail",contactUsController.createMailer);

//for subscription
router.post("/addsubscription",usercontroler.addSubscriber);
router.get("/getsubscribe",auth.adminProtect,usercontroler.getSubscribers);
router.post("/deletesubscribe",auth.adminProtect,usercontroler.deleteSubscribers);
router.post("/subscribemail",auth.adminProtect,usercontroler.subscribeMail);
router.delete("/deleteuserSearch/:value",usercontroler.deleteUserSearch);





module.exports = router;
