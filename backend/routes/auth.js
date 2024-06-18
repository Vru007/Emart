const express=require('express');
const { createUser, checkUser } = require('../controller/auth');
const router=express.Router();

router.post('/signup',createUser)
      .post('/login',checkUser);

exports.router=router;