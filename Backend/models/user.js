const mongoose = require('mongoose');
 
const userSchema = new mongoose.Schema({
     f_name:{type:String,text:true},
    l_name:{type:String,text:true},
    dob:{type:String,text:true}, 
    gender:{type:String,text:true}, 
    address:{type:String,text:true}, 
    email:{type:String,text:true}, 
    mobile:{type:String,text:true}, 
    password:{type:String,text:true}, 
    role_id:{type:String,default:2}, 
    photo:{type:String,text:true}, 
    status:{type:Boolean,default:true}
} ,{
    timestamps:true
})
module.exports=mongoose.model('user',userSchema)