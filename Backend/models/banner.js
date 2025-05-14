const mongoose = require('mongoose');
 
const bannerSchema = new mongoose.Schema({
    banner_name:{type:String,text:true},
    photo:{type:String,text:true},
    status:{type:Boolean,default:true}
} ,{
    timestamps:true
})
module.exports=mongoose.model('banner',bannerSchema)