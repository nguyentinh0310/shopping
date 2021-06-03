const Cart = require("../models/cartModel");

const cartCtrl = {
  addToCart: async (req, res, next) => {
    try {
      const cart  = new Cart({
        user: req.user.id,
        cartItems: [req.body.cartItems],
      });
      if(cart){
        const product = req.body.cartItems.product;
        const item = cart.cartItems.find((c) => (c.product == product));
  
        if (item) {
          await Cart.findOneAndUpdate(
            { "user": req.user._id, "cartItems.cart": product },
            {
              "$set": {
                "cartItems": {
                  ...req.body.cartItems,
                  quantity : item.quantity + req.body.cartItems.quantity
                },
              },
            })
          } 
      }else {
        await Cart.findOneAndUpdate(
          { user: req.user._id },
          {
            "$push": {
              "cartItems": req.body.cartItems,
            },
          }
        )
      }
      await cart.save();
      res.status(201).json({
        message: "Thêm vào giỏ hàng thành công!",
        cart,
      });
    } catch (err) {
      next(err);
    }
  },
  getCart: async (req, res, next) => {
    try {
      Cart.findOne({ user: req.user._id })
      .populate("cartItems.product", "_id name price productPictures")
      .exec((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          let cartItems = {};
          cart.cartItems.forEach((item, index) => {
            cartItems[item.product._id.toString()] = {
              _id: item.product._id.toString(),
              name: item.product.name,
              img: item.product.productPictures[0].img,
              price: item.product.price,
              qty: item.quantity,
            };
          });
          res.status(200).json({ cartItems });
        }
      });
    } catch (err) {
      next(err);
    }
  },
  deleteToCart: async (req, res, next) => {
    try {
      const cart = await Cart.findOne(req.user.id, req.product.id);

      cart.remove();
      res.status(200).json("Xóa sản phẩm trong giỏ hàng thành công");
    } catch (err) {
      next(err);
    }
  },
  updateToCart: async (req, res, next) => {
    try {
    } catch (err) {
      next(err);
    }
  },
};

function runUpdate(condition, updateData) {
  return new Promise((resolve, reject) => {
    //you update code here

    Cart.findOneAndUpdate(condition, updateData, { upsert: true })
      .then((result) => resolve())
      .catch((err) => reject(err));
  });
}

module.exports = cartCtrl;





// Cart.findOne({ user: req.user._id }).exec((err, cart) => {
//   if (err) return res.status(400).json({ err });
//   if (cart) {
//     // nếu cart tồn tại thì update cart
//     console.log(cart);

//     const product = req.body.cartItems.product;
//     const item = cart.cartItems.find((c) => (c.product == product));

//     if (item) {
//       Cart.findOneAndUpdate(
//         { "user": req.user._id, "cartItems.cart": product },
//         {
//           "$set": {
//             "cartItems": {
//               ...req.body.cartItems,
//               quantity : item.quantity + req.body.cartItems.quantity
//             },
//           },
//         }
//       ).exec((err, _cart) => {
//         if (err) return res.status(400).json({ err });
//         if (_cart) {
//           return res.status(201).json({
//             message: "Thêm vào giỏ hàng thành công!",
//             cart: _cart,
//           });
//         }
//       });
//     } exec((err, _cart) => {
//         if (err) return res.status(400).json({ err });
//         if (_cart) {
//           return res.status(201).json({
//             message: "Thêm vào giỏ hàng thành công!",
//             cart: _cart,
//           });
//         }
//       });
//     }
//   } else {
//     // nếu cart không tồn tại thì tạo mới
//     const cart = new Cart({
//       user: req.user.id,
//       cartItems: [req.body.cartItems],
//     });
//     cart.save((err,cart) =>{
//       if (err) return res.status(400).json({ err });
//       if (cart) {
//         return res.status(201).json({
//           message: "Thêm vào giỏ hàng thành công! 😇",
//           cart,
//         });
//       }
//     });

//   }
// });