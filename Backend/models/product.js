const mongoose = require('mongoose');
 
const productSchema = new mongoose.Schema({
    product_name:{type:String,text:true},
    product_description:{type:String,text:true},
    photo:{type:String,text:true}, 
    product_price:{type:String,text:true}, 
    product_category:{type:mongoose.Schema.Types.ObjectId,ref:"category"},
    product_stock_quantity:{type:String,text:true}, 
    
    status:{type:Boolean,default:true}

} ,{
    timestamps:true
})
module.exports=mongoose.model('product',productSchema)