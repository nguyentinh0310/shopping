const express = require("express");
const orderRouter = new express.Router();
const orderCtrl = require("../controllers/orderCtrl");
const authenticatedMiddleware = require('../middlewares/auth')
const authorizeAdmin = require('../middlewares/authorizeAdmin')

orderRouter.post("/new",authenticatedMiddleware, orderCtrl.newOrder)

orderRouter.get("/:id",authenticatedMiddleware, orderCtrl.getSingleOrder)

orderRouter.get("/user/me",authenticatedMiddleware, orderCtrl.myOrder)

orderRouter.get("/",authenticatedMiddleware,authorizeAdmin, orderCtrl.allOrder)

orderRouter.put("/:id",authenticatedMiddleware,authorizeAdmin, orderCtrl.updateProcessOrder)

orderRouter.delete("/:id",authenticatedMiddleware,authorizeAdmin, orderCtrl.deleteOrder)

module.exports = orderRouter