const {Product} =require("../model/product");
exports.createProduct=async(req,res)=>{
    const product=new Product(req.body);
    try{
    const response=await product.save();
    res.status(200).json(response);
    console.log(response);
    }
    catch(err){
        res.status(400).json(err);
    
    }
}

exports.fetchAllProducts=async(req,res)=>{
    let str=Product.find({});
    let totalCount=Product.find({});
    if(req.query.category){
        str=str.find({category:req.query.category});
        totalCount=totalCount.find({category:req.query.category});
    }
    if(req.query.brand){
        str=str.find({brand:req.query.brand});
        totalCount=totalCount.find({brand:req.query.brand});
    }
    if(req.query._sort && req.query._order){
        str=str.sort({[req.query._sort]:req.query._order});

    }

    const totalDocs=await totalCount.count().exec();
    if(req.query._page && req.query._limit){
        const pageSize=req.query._limit;
        const page=req.query._page;
        str=str.skip(pageSize*(page-1)).limit(pageSize);
    }

    try{
        console.log("str: ",str);
        const docs=await str.exec();
        res.set('X-Total-Count',totalDocs);
        res.status(200).json(docs);
        
    }
    catch(err){
        res.status(400).json(err);
    }
}

exports.fetchProductById=async(req,res)=>{
    
    const {id}=req.params;
    try{
    const product=await Product.findById(id);
    res.status(200).json(product);
}
catch(err){
    console.log(err);
    res.status(400).json(err);
}
}

exports.updateProduct=async(req,res)=>{
    const {id}=req.params;
    try{
          
        const updatedProduct=await Product.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json(updatedProduct);
    }
    catch(err){
        console.log(err);
        res.status(400).json(err);
    }
}