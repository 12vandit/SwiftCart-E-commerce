const fronContact = require("../models/contact");

//add
module.exports.addFronContact = async(req,res)=>{
    try {
        const findfronContact = await fronContact.findOne({business_email:req.body.business_email})
          if(findfronContact){
            
            return res.json({
                status: 400,
                message: "user already exists",
                success:false,
            })
        }else{
                const add = await fronContact.create(req.body);
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