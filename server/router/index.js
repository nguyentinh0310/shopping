const express = require('express')
const router = new express.Router()

const productRouter = require('./product')
const userRouter = require('./user')
const orderRouter = require('./order')

router.use('/api/product', productRouter)
router.use('/api/auth', userRouter)
router.use('/api/order', orderRouter)

module.exports= router