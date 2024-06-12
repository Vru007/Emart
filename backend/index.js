const express=require('express');
const app = express();
const mongoose=require('mongoose');
const { createProduct } = require('./controller/Product');
const productRouter=require('./routes/Product');
const categoryRouter=require('./routes/Category');
const brandRouter=require('./routes/Brand');
const cors=require('cors');

// app.use(cors());
app.use(cors());
app.use(express.json());
app.use('/products',productRouter.router);
app.use('/category',categoryRouter.router);
app.use('/brand',brandRouter.router);

// Use CORS middleware with specified options



try{
 mongoose.connect('mongodb+srv://vrushikpatel7143:bmelpbbv5u8SEkq8@cluster0.lmfulps.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
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



