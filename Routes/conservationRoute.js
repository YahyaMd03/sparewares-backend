const {createConversation,getConversation,conservationUser,conversationAdmin,conversationalUserDetails,updateMessage}=require("../controller/conversationController")
const router=require("express").Router()
const {adminProtect,userProtect}=require("../middleware/auth")

router.route("/create-conservation").post(userProtect,createConversation)
router.route("/get-conservation-admin").get(adminProtect,getConversation)
router.route("/get-conservation-user").get(userProtect,conservationUser)
router.route("/update-conservation/:id").patch(updateMessage)
router.route("/update-conservation-userDetails/:id").get(conversationalUserDetails)
router.route("/update-conservation-adminDetails/:id").get(conversationAdmin)


module.exports=router;