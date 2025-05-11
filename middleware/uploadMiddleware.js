const multer = require("multer");
const path = require("path");

// Define storage for both images and videos
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Determine the destination folder based on file type
    const destinationFolder = file.mimetype.startsWith("image") ?
      path.join(__dirname, "../public") : // Images destination
      path.join(__dirname, "../public"); // Videos destination
    cb(null, destinationFolder);
  },
  filename: function (req, file, cb) {
    const suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // Adjust the file extension based on the uploaded file type
    const extension = file.mimetype.startsWith("image") ? "jpg" : "mp4";
    cb(null, file.originalname.split(".")[0] + "-" + suffix + "." + extension);
  }
});

// Configure multer for uploading both images and videos
const uploadPhoto = multer({
  storage: multerStorage,
  limits: { fileSize: 50000000 } // Adjust file size limit as needed
});

module.exports = { uploadPhoto };