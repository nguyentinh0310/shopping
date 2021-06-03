const mongoose = require("mongoose");
const MODEL_NAME = "categories";
const COLLECTION_NAME = "categories";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Xin mời nhập tên thể loại"],
    unique: true,
  },
  description: String,
});

const categoryModel = mongoose.model(
  MODEL_NAME,
  categorySchema,
  COLLECTION_NAME
);

module.exports = categoryModel;
