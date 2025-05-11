const os = require("os");
const { DateTime } = require("luxon");
const Chat = require("../model/chatModel");
const Notification = require("../model/admin_model/Notification");

function getIp() {
  const networkInterfaces = os.networkInterfaces();

  const ipv4Addresses = Object.values(networkInterfaces)
    .flat()
    .filter((interface) => interface.family === "IPv4" && !interface.internal)
    .map((interface) => interface.address);
  return ipv4Addresses;
}

exports.addChat = async (req, res) => {
  try {
    const {
      ipaddress,
      customerName,
      customerId,
      customerNumber,
      message,
      sendedBy,
    } = req.body;
    const currentDate = DateTime.now().setZone("Asia/Kolkata").toJSDate();
    const formattedDateTime = currentDate.toLocaleString("en-IN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    const chatMessage = {
      message: message,
      sendedBy: sendedBy,
      date: formattedDateTime,
    };

    //adding notification table
    if (sendedBy == "customer") {
      await Notification.create({ type: "chat" });
    }

    //check new chat or exist chat
    const existChat = await Chat.find({ ipAddress: ipaddress });

    //updating existing chat
    if (existChat.length > 0) {
      if (existChat[0].isBlocked) {
        return res.status(403).json({ Message: "Sorry blocked by admin" });
      }
      await Chat.updateOne(
        { ipAddress: ipaddress },
        {
          $push: { message: chatMessage },
        }
      );
      return res.status(200).json({ Message: "Chat updated successfully" });
    }

    //adding new chat
    await Chat.create({
      ipAddress: ipaddress,
      customerName: customerName,
      customerNumber: customerNumber,
      customerId: customerId,
      message: chatMessage,
    });
    return res.status(200).json({ Message: "chat addedd successfully" });
  } catch (e) {
    return res.status(500).json({ Message: "Error in adding chat" });
  }
};

exports.getAllChats = async (req, res) => {
  try {
    const allChats = await Chat.find().sort({ updatedAt: -1 });
    return res.status(200).json({ chats: allChats });
  } catch (e) {
    return res.staus(500).json({ Message: "Error in getting all chats" });
  }
};

exports.getSpecificChat = async (req, res) => {
  try {
    // const ipAddress = getIp()
    const ipAddress = req.query.ipaddress;
    const existChat = await Chat.find({ ipAddress: ipAddress });
    if (existChat.length > 0) {
      return res.status(200).json({ chat: existChat });
    }
    return res.status(200).json({ Message: "No chat found this ipAddress" });
  } catch (e) {
    return res.status(500).json({ Message: "Erro in getting specific chat" });
  }
};

exports.getChatAssistant = async (req, res) => {
  try {
    const { id } = req.params;
    const existChat = await Chat.find({ _id: id });
    if (existChat.length > 0) {
      return res.status(200).json({ chat: existChat });
    }
    return res.status(200).json({ Message: "No chat found this ipAddress" });
  } catch (e) {
    return res.status(500).json({ Message: "Erro in getting specific chat" });
  }
};

exports.blockCustomer = async (req, res) => {
  try {
    const { id } = req.body;
    const existChat = await Chat.findOne({ _id: id });
    if (existChat) {
      if (existChat.isBlocked) {
        return res.status(200).json({ Message: "Customer is already blocked" });
      } else {
        await Chat.updateOne({ _id: id }, { isBlocked: true });
        return res
          .status(200)
          .json({ Message: "Customer blocked successfully" });
      }
    } else {
      return res
        .status(404)
        .json({ Message: "No customer found with this ID" });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ Message: "Error in blocking customer" });
  }
};

exports.unBlockCustomer = async (req, res) => {
  try {
    const { id } = req.body;
    const existChat = await Chat.findOne({ _id: id });
    if (existChat) {
      if (existChat.isBlocked) {
        await Chat.updateOne({ _id: id }, { isBlocked: false });
        return res
          .status(200)
          .json({ Message: "Customer Unblocked successfully" });
      } else {
        return res
          .status(200)
          .json({ Message: "Customer is already Unblocked" });
      }
    } else {
      return res
        .status(404)
        .json({ Message: "No customer found with this ID" });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ Message: "Error in unblocking customer" });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.body;
    const existChat = await Chat.findOne({ _id: id });
    if (existChat) {
      await Chat.deleteOne({ _id: id });
      return res
        .status(200)
        .json({ Message: "Customer chat deleted successfully" });
    } else {
      return res
        .status(404)
        .json({ Message: "No customer found with this ID" });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ Message: "Error in deleting customer" });
  }
};
