const User = require("../model/user_model");
const Subscribe = require("../model/subscribeModel");
const productModel = require("../model/product_model");
const jwt = require("jsonwebtoken");
const Session = require("../model/admin_model/Session");
const subscribeMail = require("../utils/subscribeMail");
const { default: mongoose } = require("mongoose");
const queryString = require("querystring");
const axios = require("axios");
const { smsApi } = require("../utils/sms");
exports.createUser = async (req, res) => {
  try {
    const { email, number } = req.body;

    //checking for existing customer
    const existEmailOrNumber = await User.findOne({ email, number });
    if (existEmailOrNumber) {
      return res.status(409).json({ Message: "User already exist" });
    }

    //generating customer id
    const lastCustomer = await User.findOne({}).sort({ date: -1 });
    if (lastCustomer) {
      const digit = lastCustomer.customerId.toString();
      const lastSixDigits = digit.substring(digit.length - 6);
      let paddedNextValue = parseInt(lastSixDigits, 10) + 1;
      nextValue = paddedNextValue.toString().padStart(6, "0");
    } else {
      nextValue = "000001";
    }
    const customerId = "SWC-" + nextValue;

    //storing the value
    const newUser = await User.create({ ...req.body, customerId });
    res.status(201).json({ Message: "New user has been created" });

    if (newUser) {
      smsApi(
        newUser?.number,
        `[SpareWares.com] Welcome! Your account has been successfully created. Crafty components`,
        "1007957527110124496"
      );
    }
  } catch (err) {
    console.log("error in creating user", err);
    return res
      .status(500)
      .json({ Message: "error in creating user", error: err.message });
  }
};

//fetch category BY ID
exports.fetchuser = async (req, res) => {
  try {
    const { _id } = req.user;
    if (!_id) {
      return res.status(403).json({ message: "unauthorized" });
    }
    const users = await User.findById({ _id: _id });
    return res.status(200).json({ success: true, user: users });
  } catch (err) {
    console.log("error :", err);
    return res
      .status(500)
      .json({ message: "internal server error ", error: err });
  }
};

exports.login = async (req, res) => {
  try {
    const { emailOrNumber } = req.body;
    let user;
    if (!emailOrNumber) {
      return res.status(200).json({ Message: "Both fields are required" });
    }
    //Checking for user
    user = await User.findOne({
      $or: [
        { email: emailOrNumber, is_deleted: false },
        { number: emailOrNumber, is_deleted: false },
      ],
    });

    if (!user) {
      return res.status(404).json("user not found");
    }

    user = {
      user_id: user._id,
      user_name: user.name,
      user_email: user.email,
      customerId: user.customerId,
      user_number: user.number,
    };
    const id = user.user_id;
    const token = jwt.sign({ id }, process.env.SECRET_STRING, {
      expiresIn: process.env.EXPIRE_DAYS,
    });

    //Addding For sesssion
    const session = await Session.create({ user_id: id, token: token });
    return res.status(200).json({ Message: "ok", token, data: { user } });
  } catch (err) {
    return res.status(500).json({ Message: "Error in Login" });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ Message: "Email is required" });
    }
    const user = await User.findOne({ email, is_deleted: false });
    if (!user) {
      return res.status(404).json({ Message: `No user found in ${email}` });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: "Error in forgot password" });
  }
};

exports.logout = async (req, res) => {
  try {
    const { _id } = req.user;
    const deletedSession = await Session.findOneAndDelete({ user_id: _id });
    return res.status(200).json({ Message: "User deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: "Error in logut function" });
  }
};

exports.addWishList = async (req, res) => {
  try {
    const { _id } = req.user;
    const { productId } = req.body;

    const user = await User.findOne({ _id });

    const isProductInWishlist = user.user_wishlist.find(
      (wishlistItem) => wishlistItem.toString() === productId.toString()
    );

    if (isProductInWishlist) {
      await User.updateOne(
        { _id },
        { $pull: { user_wishlist: new mongoose.Types.ObjectId(productId) } }
      );
      return res.status(200).json({ Message: "Removed from wishlist" });
    } else {
      await User.findByIdAndUpdate(
        _id,
        { $push: { user_wishlist: new mongoose.Types.ObjectId(productId) } },
        { new: true }
      );
      return res.status(200).json({ Message: "Added to wishlist" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: "Error in adding wish list" });
  }
};

exports.getWishList = async (req, res) => {
  try {
    const { _id } = req.user;
    const products = await User.find({ _id: _id }).select("user_wishlist -_id");
    const data = [];
    for (let product of products[0].user_wishlist) {
      const productDetails = await productModel.findById(product);
      data.push(productDetails);
    }
    return res
      .status(200)
      .json({ Message: "Success", productDetails: data, productId: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.existEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(204).json({ Message: "email required" });
    }
    const existEmail = await User.findOne({ email: email });
    if (existEmail) {
      return res.status(200).json({ Message: "Email Already Exist" });
    }
    return res.status(201).json({ Message: "New user" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ Message: "Error in checking existing email" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { _id } = req.user;
    const { name, email, number } = req.body;
    const updatedUser = await User.findByIdAndUpdate(_id, {
      name: name,
      email: email,
      number: number,
    });
    return res.status(200).json({ Message: "Successfully updated" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: "Error in updating user" });
  }
};

exports.deleteAllWishList = async (req, res) => {
  try {
    const { _id } = req.user;
    const updateResult = await User.updateOne(
      { _id },
      { $set: { user_wishlist: [] } }
    );
    return res.status(200).json({ Message: "deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: "Error in deleting all wishlist" });
  }
};

exports.existnumber = async (req, res) => {
  try {
    const { number } = req.body;
    const existnumber = await User.findOne({ number: number });
    if (existnumber) {
      return res.status(200).json({ Message: "Mobile number Already Exist" });
    }
    return res.status(201).json({ Message: "New user" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ Message: "Error in checking existing email" });
  }
};
exports.usersearch = async (req, res) => {
  try {
    const { _id } = req.user;
    const { user_search, keyword, id } = req.body;
    let updateQuery;
    if (user_search) {
      for (let search of user_search) {
        const existingUser = await User.findOne({
          _id: _id,
          "usersearch.keyword": search.keyword,
          "usersearch.id": search.id,
        });
        if (!existingUser) {
          updateQuery = {
            $addToSet: {
              usersearch: { keyword: search.keyword, id: search.id },
            },
          };
          await User.updateOne({ _id: _id }, updateQuery);
        }
      }
    } else {
      const existingUser = await User.findOne({
        _id: _id,
        "usersearch.keyword": keyword,
        "usersearch.id": id,
      });
      if (!existingUser) {
        updateQuery = {
          $addToSet: { usersearch: { keyword: keyword, id: id } },
        };
        await User.updateOne({ _id: _id }, updateQuery);
      }
    }
    return res
      .status(200)
      .json({ message: "User search updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addSubscriber = async (req, res) => {
  try {
    const { email } = req.body;
    const existsubscribe = await Subscribe.findOne({ email: email });
    if (existsubscribe) {
      return res.status(200).json({ Message: "Mail already exist" });
    }
    const newsubscribe = await Subscribe.create(req.body);
    return res.status(201).json({ Message: "Subscription successfull" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ Message: "Error in adding subcrition" });
  }
};

exports.getSubscribers = async (req, res) => {
  try {
    const emails = await Subscribe.find().sort({ createdAt: -1 });
    return res.status(200).json({ data: emails });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ Message: "error in getting subscribed email" });
  }
};
exports.deleteSubscribers = async (req, res) => {
  try {
    const { id } = req.body;
    const emails = await Subscribe.findByIdAndDelete(id);
    return res.status(200).json({ Message: "unsubscribed succssfully" });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ Message: "error in deleting subscribed email" });
  }
};

exports.subscribeMail = async (req, res) => {
  try {
    const { message, subject, imgFile } = req.body;
    const emails = await Subscribe.find();
    const from = "SpareWares";
    const imgUrl = process.env.API_url;
    for (let email of emails) {
      const senderemail = email.email;
      const sendMail = await subscribeMail({
        from,
        imgUrl,
        imgFile,
        senderemail,
        message,
        subject,
      });
    }
    return res.status(200).json({ Message: "Mail sended successfully" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ Message: "Error in sending mail" });
  }
};

exports.getSpecificAddress = async (req, res) => {
  try {
    const { _id } = req.user;
    const address = await User.findOne({ _id: _id }).select(
      "shipping_address -_id"
    );
    return res.status(200).json({ address: address.shipping_address });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ Message: "Error in getting specific address" });
  }
};

exports.activateDefaultAddress = async (req, res) => {
  try {
    const { _id } = req.user;
    const { arrayId } = req.body;
    await User.updateOne(
      { _id: _id },
      { $set: { "shipping_address.$[].defaultAddress": false } }
    );
    await User.updateOne(
      {
        _id: _id,
        "shipping_address._id": arrayId,
      },
      {
        $set: {
          "shipping_address.$.defaultAddress": true,
        },
      }
    );
    return res.status(200).json({ Message: "Default address addedd" });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ Message: "Error in activating default address" });
  }
};

exports.deleteUserSearch = async (req, res) => {
  try {
    const keyword = req.params.value.trim();
    const regexPattern = new RegExp(keyword, "i");
    const result = await User.updateMany(
      { "usersearch.keyword": regexPattern },
      { $pull: { usersearch: { keyword: regexPattern } } }
    );
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "User searches deleted successfully" });
    } else {
      res.status(404).json({ error: "User searches not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

