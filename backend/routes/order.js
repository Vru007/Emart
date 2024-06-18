const express=require('express');
const { createOrder,fetchOrderByUserId } = require('../controller/order');
const router=express.Router();

router.post('/',createOrder)
      .get('/allorders',fetchOrderByUserId);

exports.router=router;