const conversationSchmea = require("../model/conversationModel");
const UserModel = require("../model/user_model");

const adminModel = require("../model/admin_model/adminModel");

exports.createConversation = async (req, res) => {
  try {
    const { groupTitle, userId } = req.body;
    const isConversationexists = await conversationSchmea.findOne({
      groupTitle: groupTitle,
    });
    if (isConversationexists) {
      const conservation = isConversationexists;
      return res.status(201).json({ status: true, conservation });
    } else {
      const conversation = await conversationSchmea.create({
        member: [userId, "admin"],
        groupTitle: groupTitle,
      });
      return res.status(201).json({ message: conversation });
    }
  } catch (err) {
    return res.status(400).json({ message: "Went Wrong" });
  }
};

exports.getConversation = async (req, res) => {
  const { role } = req.user;
  try {
    const conservation = await conversationSchmea
      .find({member: { $in: [role] }})
      .sort({ updatedAt: -1, createdAt: -1 });
    return res.status(201).json({ status: true, conservation });
  } catch (err) {
    return res.status(400).json({ message: "Went Wrong" });
  }
};

exports.conservationUser = async (req, res) => {
  try {
    const { _id } = req.user;

    const conversation = await conversationSchmea
      .find({ member: { $in: [_id.toString()] } })
      .sort({ updatedAt: -1, createdAt: -1 });

    res.status(200).json({ conversation });
  } catch (err) {
    return res.status(400).json({ message: "Went Wrong" });
  }
};

exports.updateMessage = async (req, res) => {
  try {
    const { lastMessage, lastMessageId } = req.body;

    const conversation = await conversationSchmea.findByIdAndUpdate(
      req.params.id,
      { lastmessage:lastMessage, lastmessageId:lastMessageId },
      { new: true }
    );

    res.status(200).json({ success: true, conversation });
  } catch (error) {
    return res.status(500).json({ message: "went wrong" });
  }
};

exports.conversationalUserDetails = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);


    res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ message: "went wrong" });
  }
};

exports.conversationAdmin = async (req, res) => {
  try {
    const user = await adminModel.findById(req.params.id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ message: "went wrong" });
  }
};
