
const mongoose = require("mongoose");

const categorySchema=new mongoose.Schema({
   category_name:{type:String,text:true},
   category_description:{type:String,text:true},
   photo:{type:String,text:true},

    status:{type:Boolean,default:true},
},{timestamps:true}
)
module.exports=mongoose.model('category',categorySchema)