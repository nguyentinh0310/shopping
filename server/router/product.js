const express = require("express");
const productRouter = new express.Router();
const productCtrl = require("../controllers/productCtrl");
const authenticatedMiddleware = require('../middlewares/auth')
const authorizeAdmin = require('../middlewares/authorizeAdmin')

productRouter.get("/", productCtrl.getMany);

productRouter.get("/all", productCtrl.getAll);

productRouter.get("/:id", productCtrl.getSingleProduct);

// review
productRouter.get("/reviews/all",authenticatedMiddleware, productCtrl.getProductReviews);

productRouter.put("/review",authenticatedMiddleware, productCtrl.createReviewProduct);

productRouter.delete("reviews/sp", authenticatedMiddleware, productCtrl.deleteProductReviews)

// admin
productRouter.post("/",authenticatedMiddleware,authorizeAdmin, productCtrl.create);

productRouter.put("/:id",authenticatedMiddleware,authorizeAdmin, productCtrl.update);

productRouter.delete("/:id",authenticatedMiddleware,authorizeAdmin, productCtrl.delete);


module.exports = productRouter;
