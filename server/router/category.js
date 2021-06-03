const express = require('express')
const categoryRouter = new express.Router();
const categoryCtrl = require('../controllers/categoryCtrl')
const authenticatedMiddleware = require('../middlewares/auth')
const authorizeAdmin = require('../middlewares/authorizeAdmin')

categoryRouter.get('/', categoryCtrl.getMany)

categoryRouter.get('/:id', categoryCtrl.getSingleCategory)

categoryRouter.post('/',authenticatedMiddleware,authorizeAdmin, categoryCtrl.create)

categoryRouter.put('/',authenticatedMiddleware,authorizeAdmin, categoryCtrl.update)

categoryRouter.delete('/:id',authenticatedMiddleware,authorizeAdmin, categoryCtrl.delete)

module.exports =categoryRouter