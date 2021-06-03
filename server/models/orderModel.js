const mongoose = require("mongoose");
const MODEL_NAME = "order";
const COLLECTION_NAME = "order";

const orderSchema = new mongoose.Schema({
    shippingInfo: {
      address: {
        type: String,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
        match: [
          /(84|0[3|5|7|8|9])+([0-9]{8})\b/g, 
          'Xin mời nhập số điện thoại hợp lệ']
      },
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      required: true,
    },
    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "products",
          required: true,
        },
      },
    ],
    paidAt: {
      type: Date,
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    orderStatus: {
      type: String,
      required: true,
      default: "Đang xử lý",
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model(MODEL_NAME, orderSchema, COLLECTION_NAME);

module.exports = orderModel;
