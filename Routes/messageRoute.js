const {
  createMessage,
  getMessage,
} = require("../controller/messageController");
const router = require("express").Router();
const { upload } = require("../utils/multermiddleware");
router.route("/create-message").post(upload.single("image"), createMessage);
router.route("/get-message/:id").get(getMessage);

module.exports=router
