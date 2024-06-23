const express=require('express');
const {Users}=require("../model/user");
const crypto=require("crypto");
const jwt =require('jsonwebtoken');
const {sanitizeUser}=require('../services/common'); 
require('dotenv').config();

const SECRET_KEY=process.env.SECRET_KEY;
exports.createUser=async(req,res)=>{
    
     
    if(await Users.findOne({email:req.body.email})){
        return res.status(400).json({message: 'Email already exists'});
    }
    
    try{
        const salt=crypto.randomBytes(16);
        crypto.pbkdf2(req.body.password, salt,310000,32,'sha256',async function(err,hashedPassword){
        const user=new Users({...req.body,password:hashedPassword,salt});
        const response=await user.save();

        req.login(sanitizeUser(response),(err)=>{
            if(err){res.status(400).json(err);}
            else{
                const token=jwt.sign(sanitizeUser(user),SECRET_KEY);
                res.cookie('jwt',token,{expires: new Date(Date.now()+3600000),httpOnly:true})
                .status(201)
                .json(token);
            }
        })
       return res.status(200).json(response);
    });
    }
    catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}

exports.checkLogin=async(req,res)=>{
    try{
    res.cookie('jwt',req.user.token,{
    expires:new Date(Date.now()+3600000),
    httpOnly:true,
   })
    .status(201)
    .json(req.user.token);
}catch(err){
    res.status(400).json(err);
}
}
exports.checkUser=async(req,res)=>{
    res.json(req.user);
}


