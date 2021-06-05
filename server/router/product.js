const express = require("express");
const productRouter = new express.Router();
const productCtrl = require("../controllers/productCtrl");
const authenticatedMiddleware = require('../middlewares/auth')
const authorizeAdmin = require('../middlewares/authorizeAdmin')
const uploadImage = require('../middlewares/uploadImage')

productRouter.get("/", productCtrl.getMany);

productRouter.get("/all", productCtrl.getAll);

productRouter.get("/:id", productCtrl.getSingleProduct);

// review
productRouter.get("/reviews/all",authenticatedMiddleware, productCtrl.getProductReviews);

productRouter.put("/review",authenticatedMiddleware, productCtrl.createProductReview);

productRouter.delete("reviews/del", authenticatedMiddleware, productCtrl.deleteProductReviews)

// admin
productRouter.post("/",authenticatedMiddleware,authorizeAdmin, productCtrl.create);

productRouter.put("/:id",authenticatedMiddleware,authorizeAdmin, productCtrl.update);

productRouter.delete("/:id",authenticatedMiddleware,authorizeAdmin, productCtrl.delete);


module.exports = productRouter;
