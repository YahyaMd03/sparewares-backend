const Product = require('../../../model/product_model')

exports.getRating = async (req, res) => {
  try {
    const products = await Product.find({ is_deleted: false });
    const ratings = [];

    for (let product of products) {
      if (product.ratings) {
        for (let rating of product.ratings) {
          const combinedObject = {
            productId: product._id,
            productName: product.product_name,
            partNumber: product.part_number,
            rating
          };
          ratings.push(combinedObject);
        }
      }
    }

    return res.status(200).json({ Message: 'Success', data: ratings });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ Message: 'Error in fetching reviews' });
  }
};

exports.deleteRating = async (req, res) => {
  try {
    const { customerId, productId } = req.body
    const removeRating = await Product.findOneAndUpdate(
      { _id: productId },
      { $pull: { ratings: { postedBy: customerId } } },
      { new: true }
    );

    return res.status(200).json({ Message: 'Deleted successfully' })
  }
  catch (e) {
    console.log(e)
    return res.status(500).json({ Message: 'Error in deleting rating' })
  }
}

exports.fetchRatingProduct = async (req, res) => {
  try {
    const { productId, customerId } = req.body
    const product = await Product.findOne({ _id: productId });
    for (const rating of product.ratings) {
      if (rating.postedBy == customerId.toString()) {
        return res.status(200).json({ message: "found", data: rating });
      }
    }

    return res.status(200).json({ message: 'not found' });
  }
  catch (err) {
    console.log(err)
    return res.status(500).json({ Message: 'Error in fetch rating product' })
  }
}