const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema(
  {
    converesationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    image: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
