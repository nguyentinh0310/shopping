const Order = require("../models/orderModel");
const Product = require("../models/productModel");

const orderCtrl = {
  newOrder: async (req, res, next) => {
    try {
      const {
        orderItems,
        shippingInfo,
        itemsPrice,
        shippingPrice,
        totalPrice,
      } = req.body;

      const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user.id,
      });

      res.status(201).json({
        message: "Mua hàng thành công!",
        order,
      });
    } catch (err) {
      next(err);
    }
  },
  getSingleOrder: async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id).populate(
        "users",
        "email name"
      );
      if (!order)
        return res.status(404).json({ message: "Không tìm thấy id đơn hàng" });

      res.status(200).json({
        order,
      });
    } catch (err) {
      next(err);
    }
  },
  myOrder: async (req, res, next) => {
    try {
      const orders = await Order.find({ user: req.user.id });

      res.status(200).json({ orders });
    } catch (err) {
      next(err);
    }
  },
  allOrder: async (req, res, next) => {
    try {
      const orders = await Order.find();

      let totalAmount = 0;
      orders.forEach((order) => {
        totalAmount += order.totalPrice;
      });

      res.status(200).json({
        totalAmount,
        orders,
      });
    } catch (err) {
      next(err);
    }
  },
  updateProcessOrder: async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
      if (order.orderStatus === "Delivered")
        return res.status(400).json({ message: "Bạn đã nhận đơn hàng này" });

      order.orderItems.forEach(async (item) => {
        await updateStock(item.product, item.quantity);
      });

      order.orderStatus = req.body.status; // cập nhật trạng thái giao
      order.deliveredAt = Date.now();

      await order.save();
      res.status(200).json({
        success: true,
        message: "Cập nhật tiến trình đơn hàng thành công",
        order,
      });
    } catch (err) {
      next(err);
    }
  },
  deleteOrder: async (req, res, next) => {
    try {
      let order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Không có đơn hàng nào cả",
        });
      }
      await order.remove();
      res.status(200).json({
        success: true,
        message: "Xóa đơn hàng thành công",
        order,
      });
    } catch (err) {
      next(err);
    }
  },
};

const updateStock = async(id, quantity) => {
  const product = await Product.findById(id)

  product.stock = product.stock -quantity

  await product.save({ validateBeforeSave: false })
}


module.exports = orderCtrl;
