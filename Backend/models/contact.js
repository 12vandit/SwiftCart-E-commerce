const express = require("express");
const mongoose = require("mongoose");

const contactUsSchema=new mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    phone:{type:String,text:true},
    company:{type:String,text:true},
    business_email:{type:String,text:true},
    message:{type:String,text:true},
    status:{type:Boolean,default:true},
},{timestamps:true}
)
module.exports=mongoose.model('contactUs',contactUsSchema)