const express=require('express');
const app = express();
const mongoose=require('mongoose');
const { createProduct } = require('./controller/Product');
const productRouter=require('./routes/Product');
const categoryRouter=require('./routes/Category');
const brandRouter=require('./routes/Brand');
const authRouter=require('./routes/auth');
const userRouter=require('./routes/user');
const cartRouter=require("./routes/cart");
const orderRouter=require("./routes/order");
const cors=require('cors');
require('dotenv').config();

app.use(express.json());
// app.use(cors());
app.use(cors({
   origin: 'http://localhost:5173', // Replace with your frontend's origin
   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
   allowedHeaders: ['Content-Type', 'Authorization'],
   exposedHeaders:['X-Total-Count']
}));
app.use('/products',productRouter.router);
app.use('/category',categoryRouter.router);
app.use('/brand',brandRouter.router);
app.use('/auth',authRouter.router);
app.use('/user',userRouter.router);
app.use('/cart',cartRouter.router);
app.use('/orders',orderRouter.router);
// Use CORS middleware with specified options

const MONGO_URI=process.env.MONGO_URI;

try{
 mongoose.connect(MONGO_URI)
.then(()=>{
    console.log("connected");
    app.listen(8080,()=>{
        console.log("server started at 8080");
    })
})
}catch(e){
    console.log(e);
}


app.get('/',(req,res)=>{
    res.json({status:'success'});
});



