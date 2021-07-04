const mongoose = require("mongoose");
const MODEL_NAME = "products";
const COLLECTION_NAME = "products";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Xin mời nhập tên sản phẩm"],
      unique: true,
      trim: true,
      maxLength: [100, "Tên sản phẩm không quá 100 kí tự"],
    },
    price: {
      type: Number,
      required: [true, "Xin mời nhập giá sản phẩm"],
      maxLength: [15, "Giá sản phẩm không quá 15 kí tự"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Xin mời nhập mô tả sản phẩm"],
    },
    ratings: {
      type: Number,
      default: 0.0,
    },
    images: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],

    category: {
      type: String,
      required: [true, "Vui lòng chọn danh mục cho sản phẩm này"],
      enum: {
        values: ["Quần áo", "Giày dép", "Khác"],
        message: "Vui lòng chọn đúng loại cho sản phẩm",
      },
    },

    stock: {
      type: String,
      required: [true, "Xin mời nhập kho sản phẩm"],
      maxLength: [5, "Tên sản phẩm không quá 5 kí tự"],
      default: 0,
    },
    numberOfReviews: {
      type: Number,
      default: 0.0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "users",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.model(MODEL_NAME, productSchema, COLLECTION_NAME);

module.exports = model;
