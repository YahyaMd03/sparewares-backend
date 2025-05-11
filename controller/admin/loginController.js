const Admin = require("../../model/admin_model/adminModel");
const Product = require("../../model/product_model");
const jwt = require("../../utils/jwtToken");
exports.addAdmin = async (req, res) => {
  try {
    const { email, name, password, role } = req.body;
    if (!email || !name || !password || !role) {
      return res.status(400).json({ Mesage: "All fields are manditory" });
    }
    const existEmail = await Admin.findOne({ email, is_deleted: false });
    if (existEmail) {
      return res
        .status(409)
        .json({ Message: "the entered email is already exist" });
    }
    const newAdmin = await Admin.create(req.body);
    return res.status(201).json({ Message: "New user has been created" });
  } catch (err) {
    console.log("error in adding admin", err);
    return res.status(500).json({ Message: "error in adding admin" });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ Message: "Both fields are required" });
    }
    let admin = await Admin.findOne({ email, is_deleted: false }).select(
      "+password"
    );
    if (!admin) {
      return res.status(404).json({ Message: "No user found" });
    }
    const passwordMatch = await admin.comparePasswordInDb(password);
    if (!passwordMatch) {
      return res.status(400).json({ Message: "Password not match" });
    }
    admin = {
      _id: admin._id,
      admin_name: admin.name,
      admin_email: admin.email,
      admin_role: admin.role,
    };
    jwt.sendUserToken(admin, 200, res);
  } catch (err) {
    console.log("Error in admin login", err);
    return res.status(500).json({ Message: "Error in admin Login" });
  }
};

exports.getAdmin = async (req, res) => {
  try {
    const data = await Admin.findById(req.user._id);

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({message:"Error is fetching"})
  }
};
