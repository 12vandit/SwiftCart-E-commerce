const contactUs=require("../models/contact")
const moment =require("moment")

//add
module.exports.addContactUs = async(req,res)=>{
    try {
        const findContactUs = await contactUs.findOne({business_email:req.body.business_email})
        console.log(">>>>>>>>>",findContactUs);
        
          if(findContactUs){
            
            return res.json({
                status: 400,
                message: "user already exists",
                success:false,
            })
        }else{
                const add = await contactUs.create(req.body);
                await add.save();
                if(add ){
                    
                  
                    return res.json({
                        status: 200,
                        message: "contact added successfully",
                        success:true,
                        data:add
                    })
                }
                else{
                    throw "---"
                }
            }
    } catch (error) {
        
        return res.json({
            status: 500,
            message: "Internal Server Error",
            success:false,
        })
    }
    }

    //view
    module.exports.viewContactUs = async(req,res)=>{
        try {
            const viewData = await contactUs.find({}).sort({ createdAt: -1 });
            if(viewData){
               
                return res.json({
                    status: 200,
                    message: " view successfully",
                    success:true,
                    data:viewData
                })
            }else{
          throw "--"
            }
        } catch (error) {
            
            return res.json({
                status: 500,
                message: "Internal Server Error",
                success:false,
            })
        }
        }

        //delete
        module.exports.deleteContactUs = async(req,res)=>{
            try {
                const findDelete = await contactUs.findOne({_id:req.body._id});
                // console.log("findCustomer",findCustomer);
                if(findDelete){
                const deleted = await contactUs.deleteOne({_id:req.body._id})
              
                return res.json({
                    status:200,
                    message:"conatct deleted successfully",
                    success:true,
                })
                }else{
                    
                    return res.json({
                        status:400,
                        message:"Data not found",
                        success:false
                    })
                }
            } catch (error) {
            
            return res.json({
                status:500,
                message:"something went wrong",
                success:false
            })
        }}

        //update
        module.exports.updateContactUs = async(req,res)=>{
            try {
                const findcontact= await contactUs.findOne({_id:req.body._id});
                // console.log("findcontact",findcontact)
                // return
            if(findcontact){
                // const {question,answer}= req.body
                const updatecontact = await contactUs.updateOne({_id:req.body._id},req.body);
                // console.log("upadete successfully");
           
            return res.json({
                status:200,
                message:"contact updated successfully",
                success:true,
                data:updatecontact
            })
            }
            else{
            return res.json({
                status:400,
                message:"Data not found",
                success:false,
            })
            }
            } catch (error) {
           
            return res.json({
                status:500,
                message:"Internal server error",
                success:false
            })
            }
            }