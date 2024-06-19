const express=require('express');
const { createOrder,fetchOrderByUserId,fetchAllOrders,updateStatus} = require('../controller/order');
const router=express.Router();

router.post('/',createOrder)
      .get('/orderbyid',fetchOrderByUserId)
      .get('/allorders',fetchAllOrders)
      .patch('/update/:id',updateStatus);

exports.router=router;