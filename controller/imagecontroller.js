const Image = require("../model/image");
const { deleteFromS3 } = require("../utils/uploadToS3 ");
let ProductModel = require("../model/product_model");
exports.create_image = async (req, res) => {
  try {
    const file = req.file;
    const { name } = req.body;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imageData = {
      name: name,
      image: file.location,
    };

    const image = await Image.create(imageData);
    res.status(201).json({ message: "Successfully uploaded image", image });
  } catch (err) {
    console.error("Error uploading image:", err);
    res
      .status(500)
      .json({ message: "Error uploading image", error: err.message });
  }
};
exports.fetch_image = async (req, res) => {
  try {
    const fetch = await Image.find();
    return res.status(200).json({ success: true, fetch });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "internal server error ", error: err });
  }
};

exports.delete_image = async (req, res) => {
  try {
    const { id } = req.body;
    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    const imagePath = image.image;
    if (!imagePath) {
      return res.status(400).json({ message: "No image to delete" });
    }

    const urlParts = imagePath.split("/");
    const key = urlParts.slice(3).join("/");
    await deleteFromS3(process.env.S3_BUCKET_NAME, key);
    await Image.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: err });
  }
};

exports.uploadBulkImage = async (req, res) => {
  try {
    const files = req.files;

    const updatePromises = files.map(async (file) => {
      const partNumber = file.originalname
        .split(".")[0]
        .replace(/\s*\(\d+\)$/, "");

      const product = await ProductModel.findOne({ part_number: partNumber });

      if (product) {
        product.images.push(file.filename);

        await product.save();
      }

      return product;
    });

    const updatedProducts = await Promise.all(updatePromises);

    res.status(200).json({
      message: "Images uploaded and products updated successfully",
      data: updatedProducts,
    });
  } catch (error) {
    console.error("Error uploading images and updating products:", error);
    res
      .status(500)
      .json({ message: "Failed to upload images and update products", error });
  }
};
