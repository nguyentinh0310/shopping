const express = require("express");
const cartRouter = new express.Router();
const orderCtrl = require("../controllers/cartCtrl");
const authenticatedMiddleware = require('../middlewares/auth')

cartRouter.post("/add",authenticatedMiddleware, orderCtrl.addToCart)

cartRouter.get("/",authenticatedMiddleware, orderCtrl.getCart)

cartRouter.delete("/delete",authenticatedMiddleware, orderCtrl.deleteToCart)


module.exports = cartRouter