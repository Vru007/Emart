const express=require('express');
const {Users}=require("../model/user");
exports.createUser=async(req,res)=>{
    
    if(await Users.findOne({email:req.body.email})){
        return res.status(400).json({message: 'Email already exists'});
    }
    const user= await new Users(req.body);
    try{
        const response=await user.save();
       return res.status(200).json(response);

    }
    catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}

exports.checkUser=async(req,res)=>{
    
    const {email,password}=req.body;
    console.log("email in checkUser: ",email);
    const user=await Users.findOne({email:req.body.email}).select('id email name password addresses orders');
    try{
    if(user){
        if(req.body.password===user.password){
            const userobj=user.toObject();
            delete userobj.password;
          return res.status(200).json(userobj);
    }
    else{
        
        return res.status(400).json({message:"User not found"});
    }

}
else{
    return res.status(400).json({message:"User not found"});
}
    }
catch(err){
    return res.status(400).json({message:"User not found"});
}
}



