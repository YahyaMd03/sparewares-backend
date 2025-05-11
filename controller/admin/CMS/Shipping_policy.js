const Shipping = require("../../../model/admin_model/CMS/Shipping_policy");
exports.getShippingPolicy = async (req, res) => {
  try {
    const data = await Shipping.find();
    return res.status(200).json({ Message: "success", data: data });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: "Error in getting Shipping policy" });
  }
};

exports.updateShippingPolicy = async (req, res) => {
  try {
    const { content } = req.body;
    const updatedShipping = await Shipping.findOneAndUpdate(
      {},
      { content },
      { new: true }
    );
    if (!updatedShipping) {
      await Shipping.create(req.body);
    }
    return res.status(200).json({ Message: "Successfully updated" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: "Error in updating Shipping Policy" });
  }
};
