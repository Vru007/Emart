const mongoose = require('mongoose');

const{Schema}=mongoose;
const productSchema=new Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    discountPercentage:{type:Number,min:[0,'wrong min discount'],max:[99,'wrong max discount']},
    rating:{type:Number,min:[0,'wrong min rating'],max:[5,'wrong max rating'],default:0},
    stock:{type:Number,min:[0,'wrong min stock'],default:0},
    category:{type:String,required:true},
    brand:{type:String,required:true},
    thumbnail:{type:String,required:true},
    images:{type:[String],required:true},
    status:{type:String}
})
const virtual =productSchema.virtual('id');
virtual.get(function(){
    return this._id;
})

productSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform:function(doc,ret){delete ret._id}
})

exports.Product=mongoose.model('Product',productSchema);