const csv = require("csvtojson");
const Product = require("../model/product_model");
const fs = require("fs");
const xlsx = require("xlsx");
exports.exportMiddleware = async (req, res) => {
  try {
   

    const validateAndFormatData = (data) => {
      if (!data.part_number) {
        throw new Error("ValidationError: part_number is required");
      }
      if (data.price) {
        data.price = parseFloat(data.price.toString().replace(/[^0-9.]/g, ""));
      }
      if (data.mrp) {
        data.mrp = parseFloat(data.mrp.toString().replace(/[^0-9.]/g, ""));
      }
      return data;
    };

    const processAndSaveData = async (data) => {
      for (let i = 0; i < data.length; i++) {
        try {
          const formattedData = validateAndFormatData(data[i]);
          const existId = await Product.findOne({ id: formattedData.id });
          if (existId) {
            await Product.findOneAndUpdate({ id: formattedData.id }, formattedData);
          } else {
            await Product.create(formattedData);
          }
        } catch (error) {
        }
      }
    };

    if (req.file.mimetype === "application/json") {
      const fileData = fs.readFileSync(req.file.path, "utf8");
      const jsonData = JSON.parse(fileData);
      await processAndSaveData(jsonData);
      fs.unlinkSync(req.file.path);
    } else if (req.file.mimetype === "text/csv") {
      csv()
        .fromFile(req.file.path)
        .then(async (response) => {
          await processAndSaveData(response);
          fs.unlinkSync(req.file.path);
        });
    } else if (
      req.file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      req.file.mimetype === "application/octet-stream"
    ) {
      const workbook = xlsx.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
      await processAndSaveData(sheetData);
      fs.unlinkSync(req.file.path);
    } else {
      return res.status(400).json({ Message: "Unsupported file format" });
    }

    return res.status(200).json({ Message: "Insertion successful" });
  } catch (e) {
    return res.status(500).json({ Message: e.message });
  }
};