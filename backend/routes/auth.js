const express=require('express');
const { createUser, checkLogin, checkUser } = require('../controller/auth');
const passport = require('passport');
const router=express.Router();

router.post('/signup',createUser)
      .post('/login',passport.authenticate('local'),checkLogin)
      .get('/login',passport.authenticate('jwt'),checkUser);
exports.router=router;  