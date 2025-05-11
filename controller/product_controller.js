const Product = require("../model/product_model");
const Category = require("../model/admin_model/categories_Model/Category");
const fs = require("fs");
const path = require("path");
const OrderItem = require("../model/Order_items");
const User = require("../model/user_model");
const Fuse = require("fuse.js");
const { smsApi } = require("../utils/sms");

exports.addproduct = async (req, res) => {
  try {
    const files = req.files;

    const fullData = req.body;
    if (typeof fullData.specifications === "string") {
      fullData.specifications = JSON.parse(fullData.specifications);
    }

    fullData.images = files.map((file) => `${file.filename}`);
    const product = await Product.create(fullData);
    return res
      .status(201)
      .json({ Message: "Successfully added product", product });
  } catch (err) {
    return res
      .status(500)
      .json({ Message: "Error in add product", Error: err.message });
  }
};

exports.getallproduct = async (req, res) => {
  try {
    const products = await Product.find({ is_deleted: false }).sort({
      sort_order: 1,
      createdAt: -1,
    });
    if (!products || products.length === 0) {
      return res.status(204).json({ Message: "No result found" });
    }
    return res.status(200).json({ Message: "Succes", products: products });
  } catch (err) {
    console.log("Error in fecthing product", err);
    return res
      .status(500)
      .json({ Message: "Error in fetching product", Error: err });
  }
};

exports.getSearchProduct = async (req, res) => {
  try {
    // Fetch all products from the database

    // console.log("Fetched Products:", products);

    let products = await Product.find({ is_deleted: false }).lean().exec();

    const searchKeyword = req.params.value;
    // Check if the search keyword is provided
    if (searchKeyword) {
      const options = {
        keys: [
          "product_name",
          "manufacture",
          "category",
          "variant",
          "brand",
          "model",
          "part_number",
          "keyword",
          "description",
        ],
        threshold: 0.4, // Adjust the threshold as needed
        distance: 100, // Adjust the distance as needed
        minMatchCharLength: 2, // Minimum length of the search term
      };

      const fuse = new Fuse(products, options);
      const result = fuse.search(req.params.value);
      products = result.map((res) => res.item);
    }

    // Limit the results to the first 20 items
    products = products.slice(0, 20);

    res.status(200).json({ length: products.length, products: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getproductId = async (req, res) => {
  const { id } = req.params;
  try {
    const id = req.params.id;
    const products = await Product.find({ _id: id, is_deleted: false });
    return res.status(200).json({ Message: "Succes", products: products });
  } catch (err) {
    console.log("Error in fecthing product", err);
    return res
      .status(500)
      .json({ Message: "Error in fetching product", Error: err.message });
  }
};

exports.updateproduct = async (req, res) => {
  try {
    const fullData = req.body;

    const product = await Product.findByIdAndUpdate(req.params.id, fullData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ Message: "No product found" });
    }

    return res
      .status(200)
      .json({ Message: "Product updated successfully", product: product });
  } catch (err) {
    console.log("Error in updating product:", err);
    return res
      .status(500)
      .json({ Message: "Error in updating product", Error: err });
  }
};

exports.deleteuser = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { is_deleted: true },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res
      .status(200)
      .json({ product, message: "Product successfully deleted" });
  } catch (err) {
    console.log("Error in deleting product", err);
    return res.status(500).json({ message: "Error in deleting product" });
  }
};

exports.searchProduct = async (req, res) => {
  try {
    const constructedQuery = {};
    const pageSize = req.query.limit * 1 || 12;
    if (req.query.keyword) {
      const keyword = req.query.keyword.toLowerCase();
      const regex = new RegExp(keyword, "i");

      constructedQuery.$text = { $search: regex };
    }

    const projection = req.query.keyword
      ? { score: { $meta: "textScore" } }
      : {};

    if (req.query.variant) {
      constructedQuery.variant = {
        $in: Array.isArray(req.query.variant)
          ? req.query.variant
          : [req.query.variant],
      };
    }
    if (req.query.model) {
      constructedQuery.model = {
        $in: Array.isArray(req.query.model)
          ? req.query.model
          : [req.query.model],
      };
    }

    if (req.query.category) {
      constructedQuery.category = {
        $in: Array.isArray(req.query.category)
          ? req.query.category
          : [req.query.category],
      };
    }

    if (req.query.manufacture) {
      constructedQuery.manufacture = {
        $in: Array.isArray(req.query.manufacture)
          ? req.query.manufacture
          : [req.query.manufacture],
      };
    }

    if (req.query.price) {
      constructedQuery.price = {
        $gte: parseInt(req.query.price),
      };
    }
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 12;

    const skip = (page - 1) * limit;

    const sortCriteria = {
      ...(req.query.keyword && { score: { $meta: "textScore" } }),
      createdAt: -1,
    };

    const results = await Product.find(constructedQuery, projection)
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    let totalQuery = await Product.countDocuments();

    if (req.query.page) {
      if (skip >= totalQuery) {
        throw new Error("This page not found...");
      }
    }
    const response = {
      total: totalQuery,
      page: req.query.page * 1,
      pages: Math.ceil(totalQuery / pageSize),
    };

    res.status(200).json({ data: results, response });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};




exports.searchThings = async (req, res) => {
  try {
    // Check if req.query.keyword exists and is not undefined or empty
    const keyword = req.query.keyword;

    if (!keyword || typeof keyword !== "string") {
      return res
        .status(400)
        .json({ error: "Invalid or missing 'keyword' parameter" });
    }

    const regex = keyword.toLowerCase();
    const filter = {
      $text: { $search: regex },
    };
    const projection = { score: { $meta: "textScore" } };
    const results = await Product.find(filter, projection).sort({
      score: { $meta: "textScore" },
    });
    res.status(200).json({ data: results });
  } catch (err) {
    console.error("Error for search:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.addRatings = async (req, res) => {
  try {
    const { _id, name, number } = req.user;
    const { star, images, comment, title, productId } = req.body;
    const currentDate = new Date();
    const product = await Product.findById(productId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedBy.toString() === _id.toString()
    );
    if (alreadyRated) {
      await Product.updateOne(
        { _id: productId, "ratings.postedBy": _id },
        { $set: { "ratings.$.image": [] } }
      );
      await Product.updateOne(
        { _id: productId, "ratings.postedBy": _id },
        {
          $set: {
            "ratings.$.star": star,
            "ratings.$.comment": comment,
            "ratings.$.title": title,
            "ratings.$.date": currentDate,
            "ratings.$.customerName": name,
          },
          $push: { "ratings.$.image": { $each: images } },
        }
      );
    } else {
      await Product.findByIdAndUpdate(
        productId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedBy: _id,
              image: images, // Change to append new images
              title: title,
              date: currentDate,
              customerName: name,
            },
          },
        },
        { new: true }
      );
    }

    res.status(200).json({ Message: "Success" });
    smsApi(
      number,
      "[SpareWares.com] We value your feedback! Rate your recent purchase experience. Crafty components",
      "1007517153142915529"
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ Message: "Error" });
  }
};

exports.fetchRatingProduct = async (req, res) => {
  try {
    const { _id } = req.user;
    const productId = req.query.productId;
    const product = await Product.findOne({ _id: productId });
    for (const rating of product.ratings) {
      if (rating.postedBy == _id.toString()) {
        return res.status(200).json({ message: "found", data: rating });
      }
    }

    return res.status(200).json({ message: "not found" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: "Error in fetch rating product" });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const { prodId, image } = req.body;

    const product = await Product.findById(prodId);

    const findUrl = product.images.find(
      (data) => data.toString() === image.toString()
    );

    if (findUrl) {
      const index = product.images.indexOf(findUrl);
      product.images.splice(index, 1);
      const imagePath = path.join(__dirname, "../public", findUrl);
      fs.unlinkSync(imagePath);

      await product.save();

      return res.status(200).json({ message: "deleted" });
    } else {
      return res.status(404).json({ message: "not found" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.uploadImageUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const imageUrls = req.files;
    const productImageUpate = await Product.findById(id);
    if (productImageUpate.images.length > 4) {
      return res
        .status(401)
        .json({ message: "You don't get to add more than five images" });
    }
    const newImageFilenames = imageUrls.map((file) => file.filename);
    productImageUpate.images.push(...newImageFilenames);

    await productImageUpate.save();

    return res.status(200).json(productImageUpate);
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.fetchSearchByVehicle = async (req, res) => {
  try {
    const { category, manufacture, model, variant } = req.body;
    const product = await Product.find({
      category: category,
      manufacture: manufacture,
      model: model,
      variant: variant,
    });
    if (product.length > 0) {
      return res.status(200).json({ Message: "Success", data: product });
    }
    return res.status(204).json({ Message: "No product found" });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ Message: "Error in fecthing search by vechicle" });
  }
};

exports.mostproduct = async (req, res) => {
  try {
    const product = await Product.find().sort({ sales: -1 }).limit(10);
    return res
      .status(200)
      .json({ message: "top selled Images", data: product });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error retrieving most sold products" });
    console.error(err, "error");
  }
};

exports.topcategory = async (req, res) => {
  try {
    // Retrieve all order items
    const orderItems = await OrderItem.find();

    // Map order items to products and calculate total sales by category
    const categorySalesMap = new Map();
    for (const orderItem of orderItems) {
      const product = await Product.findById(orderItem.product_id);
      if (product) {
        const category = product.category;
        const totalSales = orderItem.order_item_qty;
        if (categorySalesMap.has(category)) {
          categorySalesMap.get(category).totalSales += totalSales;
        } else {
          categorySalesMap.set(category, { product, totalSales });
        }
      }
    }
    const topSellingCategories = [...categorySalesMap.values()]
      .sort((a, b) => b.totalSales - a.totalSales)
      .slice(0, 5)
      .map(({ product }) => product);

    return res
      .status(200)
      .json({ data: topSellingCategories, message: "success" });
  } catch (error) {
    console.error("Error fetching top-selling categories:", error);
    throw error;
  }
};

exports.topManufacture = async (req, res) => {
  try {
    const orderItem = await OrderItem.find();
    const manufactureSales = new Map();
    for (let order of orderItem) {
      const product = await Product.findById(order.product_id);
      if (product) {
        const manufacture = await product.manufacture;
        const totalSales = order.order_item_qty;
        if (manufactureSales.has(manufacture)) {
          manufactureSales.get(manufacture).totalSales += totalSales;
        } else {
          manufactureSales.set(manufacture, { product, totalSales });
        }
      }
    }
    const topSellingCategories = [...manufactureSales.values()]
      .sort((a, b) => b.totalSales - a.totalSales)
      .slice(0, 5)
      .map(({ product }) => product);

    return res
      .status(200)
      .json({ data: topSellingCategories, message: "success" });
  } catch (err) {
    console.log(err);
  }
};

exports.topratings = async (req, res) => {
  try {
    const products = await Product.find();
    const productRatingsMap = new Map();
    for (const product of products) {
      let totalStars = 0;
      let numRatings = 0;
      for (const rating of product.ratings) {
        totalStars += rating.star;
        numRatings++;
      }
      console.log(numRatings);
      if (numRatings > 0) {
        const averageRating = totalStars / numRatings;
        productRatingsMap.set(product, averageRating);
      }
    }

    // Sort products by average star rating and limit to top-rated products
    const topRatedProducts = [...productRatingsMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([product]) => product);

    return res.status(200).json({ data: topRatedProducts, message: "success" });
  } catch (error) {
    console.error("Error fetching top-rated products:", error);
    throw error;
  }
};

exports.newly_added = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(10);
    return res.status(200).json({
      status: "success",
      message: "Products fetched successfully",
      data: products,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ status: "error", message: "Something went wrong" });
  }
};

exports.fetchStockClearenceProduct = async (req, res) => {
  try {
    const products = await Product.find({ stock_clearence: true });
    return res.status(200).json({ products: products });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ Message: "Erro in fetching stock clearence product" });
  }
};

exports.searched_items = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    const fetchedProducts = [];
    for (const usersearch of user.usersearch) {
      const products = await Product.findById(usersearch.id);
      if (products) {
        fetchedProducts.push(products);
      }
    }

    return res.status(200).json({
      status: "success",
      message: "Products fetched successfully",
      data: fetchedProducts,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something error", error: err });
  }
};

exports.fetchForCategory = async (req, res) => {
  try {
    const { category } = req.body;

    console.log(category);

    // Create a case-insensitive regex pattern for the category name
    const categoryRegex = new RegExp(category, "i");

    // Find the category data, ignoring case
    const categoryData = await Category.findOne({
      name: { $regex: categoryRegex },
    }).select("name desc -_id");

    // Find the product data, ignoring case
    const productData = await Product.find({
      category: { $regex: categoryRegex },
    });

    return res.status(200).json({ categoryData, productData });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ Message: "Erro in fecting specified category" });
  }
};
