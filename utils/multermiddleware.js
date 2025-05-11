const multer = require("multer");

const path = require("path");

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname.split(".")[0] + "-" + uniqueSuffix + ".jpg");
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file formate" }, false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 2000000 },
});

// const productImage = async (req, res, next) => {
//   if (!req.files) return next();

//   const product = await Promise.all(
//     req.files.map(async (file) => {
//     //   const destinationPath = path.join(
//     //     __dirname,
//     //     "public",
//     //     "product",
//     //     file.filename
//     //   );

//     //   await fs.rename(file.path, destinationPath);
//     //   return destinationPath;
//     })
//   );
//   console.log(product);
// };


module.exports = { upload};