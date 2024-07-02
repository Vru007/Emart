const { config } = require('dotenv');
const passport=require('passport');
const Razorpay = require('razorpay');
const nodemailer = require('nodemailer');
require('dotenv').config();
exports.isAuth=(req,res,done)=>{
    return passport.authenticate('jwt');
}
exports.sanitizeUser=(user)=>{
    console.log("user in sanitizer: ",user)
    console.log("user in=d in sanitizer: ",user.id);
    return {id:user.id, role:user.role}
}

exports.cookieExtractor = function(req){
    let token=null;
    if(req && req.cookies){
        token=req.cookies['jwt'];
    }
    return token;
}

exports.instance = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY_ID,
    key_secret: process.env.RAZOR_PAY_KEY_SECRET,
  });

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // replace with your SMTP server
    port: 587, // replace with the port your SMTP server uses
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'vrushikpatel7143@gmail.com', // replace with your email
        pass: process.env.NODE_MAILER_PASS// replace with your email password
    }
  });

exports.sendMail=async({to,subject,text,html})=>{
        
        const info=await transporter.sendMail({
          from: '"E-mart" <vrushikpatel7143@gmail.com>', // sender address
          to, // list of receivers
          subject, // Subject line
          text, // plain text body
          html // html body
        });
      
        return info;
      
    }
