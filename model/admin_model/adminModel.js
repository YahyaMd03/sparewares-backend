const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      select: false,
    },
    role: {
      type: String,

      default: "admin",
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timeStamp: true }
);
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next;
  this.password = await bcrypt.hash(this.password, 14);
});
adminSchema.methods.comparePasswordInDb = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Tbl_admin", adminSchema);
