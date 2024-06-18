const {Order}=require('../model/order');

exports.createOrder=async(req,res)=>{
    const order= new Order( 
        {products: req.body.products,
        user: req.body.userId,
        PaymentMethod: req.body.PaymentMethod,
        selectedAddress: req.body.selectedAddress,
        totalAmount: req.body.totalAmount,
        totalItems: req.body.totalItems});
    
    try{
        // console.log("new order backend: ",order);
        const response=await order.save();
        res.status(200).json(response);
        
    }
    catch(err){
        res.status(400).json(err);
        console.log(err);
    }
};

exports.fetchOrderByUserId=async(req,res)=>{
    const user=req.query.user;
    console.log("userID inside backend: ",user);
    try{
         const orderItems=await Order.find({user:user}).populate('user');
         console.log("orders : ",orderItems);
         return res.status(200).json(orderItems);
    }
    catch(err){
        console.log("error: ",err);
         return res.status(400).json(err);
    }
}
exports.allOrders=async(req,res)=>{
    
    try{
        const allOrders=await Order.find({}).exec();
        return res.status(200).json(allOrders);
    }
    catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}
