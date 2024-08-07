const mongoose=require('mongoose');

const {Schema}=mongoose;
const userSchema=new Schema({
    name:{type:String,required:true,},
    email: {type:String,required:true,unique:true},
    password:{type:Buffer,required:true},
    role:{type:String,required:true,default:'user'},
    addresses:{type: [Schema.Types.Mixed]},
    orders:{type: [Schema.Types.Mixed]},
    salt:Buffer,
    resetPasswordToken:{type:String,default:''}
})

const virtual =userSchema.virtual('id');
virtual.get(function(){
    return this._id;
})

userSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform:function(doc,ret){delete ret._id}
})
exports.Users=mongoose.model('Users',userSchema);