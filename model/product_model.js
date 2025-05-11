const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    product_name: {
      type: String,
      default: "",
      required: true,
    },
    part_number: {
      type: String,
      default: "",
      required: true,
    },
    keyword: {
      type: String,
      default: "",
      required: true,
    },

    model: {
      type: String,
      default: "",
      required: false,
    },
    stock: {
      type: String,
      default: "",
      required: false,
    },
    sku: {
      type: String,
      default: "",
      required: false,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },
    mrp: {
      type: String,
      default: "",
      required: true,
    },
    tax: {
      type: String,
      default: "",
      required: false,
    },
    sort_order: {
      type: String,
      default: "",
      required: false,
    },
    manufacture: {
      type: String,
      default: "",
      ref: "Tbl_manufactures",
      required: false,
    },
    category: {
      type: String,
      default: "",
      ref: "tbl_category",
      required: false,
    },
    variant: {
      type: String,
      default: "",
      ref: "Tbl_varient",
      required: false,
    },
    reward_points: {
      type: String,
      default: "",
      required: false,
    },

    year: {
      type: String,
      default: "",
      ref: "tbl_brand",
      required: false,
    },
    condition: {
      type: String,
      default: "",
      required: false,
    },
    warranty: {
      type: String,
      default: "",
      required: false,
    },
    cross_selling: {
      type: String,
      default: "",
      required: false,
    },
    tech_specification: {
      type: String,
      default: "",
      required: false,
    },
    description: {
      type: String,
      default: "",
      required: false,
    },
    length: {
      type: String,
      default: "",
      required: false,
    },
    height: {
      type: String,
      default: "",
      required: false,
    },
    breadth: {
      type: String,
      default: "",
      required: false,
    },
    dimension_class: {
      type: String,
      default: "",
      required: false,
    },
    weight: {
      type: String,
      default: "",
      required: true,
    },
    weight_class: {
      type: String,
      default: "gm",
    },
    seo_title: {
      type: String,
      default: "",
      required: false,
    },
    seo_description: {
      type: String,
      default: "",
      required: false,
    },
    seo_keyword: {
      type: String,
      default: "",
      required: false,
    },
    model: {
      type: String,
      default: "",
      ref: "Tbl_model",
      required: false,
    },
    sku: {
      type: String,
      default: "",
      required: false,
    },

    sort_by: [
      {
        type: String,
        default: "",
        required: false,
      },
    ],

    images: [],
    specifications: [
      {
        title: String,
        specDescription: String,
      },
    ],

    ratings: [
      {
        star: Number,
        comment: String,
        postedBy: String,
        image: [],
        customerName: String,
        title: String,
        date: String,
      },
    ],
    totalrating: {
      type: String,
      default: 0,
    },
    stock_status: {
      type: Boolean,
      default: true,
    },
    stock_clearence: {
      type: Boolean,
      default: false,
    },
    sales: {
      type: Number,
      default: 0,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

productSchema.index({
  product_name: "text",
  part_number: "text",
  description: "text",
  manufacture: "text",
  category: "text",
  keyword: "text",
});

productSchema.pre("save", async function (next) {
  try {
    if (this.id) return next(); // Exit if the document already has an id (indicating an update)
    const count = await this.constructor.countDocuments();

    this.id = count + 1; // Generate new ID only for new documents
    next();
  } catch (error) {
    next(error);
  }
});
module.exports = mongoose.model("tbl_product", productSchema);



