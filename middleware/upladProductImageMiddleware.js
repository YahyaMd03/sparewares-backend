const multer = require("multer");
const path = require("path");

// Define storage for both images and videos
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Determine the destination folder based on file type
    const destinationFolder = path.join(__dirname, "../public") 
    cb(null, destinationFolder);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.split(".")[0] + ".jpg");
  }
});

// Configure multer for uploading both images and videos
const uploadProductPhoto = multer({
  storage: multerStorage,
  limits: { fileSize: 10 * 1024 * 1024 } // Adjust file size limit as needed
});

module.exports = { uploadProductPhoto };