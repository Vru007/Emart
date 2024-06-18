const { Cart } = require("../model/cart")


exports.fetchCartByUserId=async(req,res)=>{
    const user=req.query.user;
    console.log("user in cart: ",user);
    try{ 
          const cartItems=await Cart.find({user:user}).populate('user').populate('product');   
          res.status(200).json(cartItems);
    }
    catch(err){
        console.log(err);
    }
}
exports.addtoCart=async(req,res)=>{
    const cart=new Cart(req.body);
    try{
        const doc=await cart.save();
        const result=await doc.populate('product');

        return res.status(200).json(result);
    }
    catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}

exports.deleteItemFromCart=async(req,res)=>{
    const {id}=req.params

    try{
        const response=await Cart.findByIdAndDelete(id);
        return res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}

exports.updateItemFromCart=async(req,res)=>{
    const {id}=req.params;
    try{
        console.log("id in backend",id);
        console.log('req.body:' ,req.body);
        const quantity=req.body.quantity;
        const response= await Cart.findByIdAndUpdate(id,{quantity:quantity},{new:true});
        console.log(response);
        return res.status(200).json(response);
    }
    catch(err){
        console.log(err);
    }
}