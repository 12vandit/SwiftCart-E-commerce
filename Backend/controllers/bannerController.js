const banner = require("../models/banner");
const responseManagement = require("../lib/responseManagment");




// banner imageUpload
module.exports.addBanner = async(req,res)=>{
    try {
     
        if(req.file == undefined){
        
             const add = await banner.create(req.body);
                await add.save();
                if(add){
                    // responseManagement.sendResponse(
                    //     res,200,helpers.banner_added_success,add
                    // )

                    return res.json({
                        status:200,
                        message:"banner_added_success",
                        success:true
                    })
                }
        }else{
            const filenames = req.file.filename;
            // console.log("filenames",filenames);
            const bannerData = {
                banner_name: req.body.banner_name,
                photo:filenames
            }
            const add = await banner.create(bannerData);
            await add.save();
            if(add){
                // responseManagement.sendResponse(
                //     res,200,helpers.banner_added_success,add
                // )  
                return res.json({
                    status:200,
                    message:"banner_added_success",
                    success:true
                
                })
            }
        }
             
    } catch (error) {
        // responseManagement.sendResponse(
        //     // console.log("error",error),
        //     res,500,helpers.banner_add_fail
        // )
        return res.json({
            status:500,
            message:"banner_add_fail",
            success:false
        })
    }
    }


    
    // banner view
    module.exports.viewBanner = async (req, res) => {
        try {
          var SITE_URL = `${process.env.HOST}${process.env.PORT}`
        //   console.log(">>>>>>>>>>",SITE_URL);
        //   return
          let viewData = await banner.find({}).sort({ createdAt: -1 });
          console.log("viewData",viewData);
        //   return
          if (viewData.length > 0) {
            viewData = viewData.map((element, index) => {
              // console.log(">>>>>>xyz>>>>>>>",viewData)
              // return
              if (element.photo) {
                let obj = {
                  ...element.toObject(),
                  photo: `${SITE_URL}/${element.photo}`
      
                };
                console.log(">>>>>>>>>>>>>>>>>",obj);
                
                return obj;
    
              } else {
                return element;
              }
            })
            return res.json({
              status: 200,
              message: "banner view success",
              success: true,
              data: viewData
            })
          } else {
            return res.json({
                  status: 400,
                  message: "BAD REQUEST",
                  success: false
                })
          }
        } catch (error) {
          console.log("error", error.message);
      
          // 
        }
      } 



    // deleted banner
module.exports.deleteBanner = async(req,res)=>{
 
    try {
        const findbanner = await banner.findOne({_id:req.body._id});
        
        if(findbanner){
        const deleted = await banner.deleteOne({_id:req.body._id})
        // responseManagement.sendResponse(
        //     res,200,helpers.banner_deleted_success
        // ) r
        return res.json({
            status:200,
            message:"banner_delete_success",
            success:true
        })
        }else{
            // responseManagement.sendResponse(
            //     res,400,helpers.banner_notdeleted_success
            // )
            return res.json({
                status:400,
                message:"banner_not_delete",
                success:false
            })
        }
    } catch (error) {
        // responseManagement.sendResponse(
        //     res,500,helpers.banner_are_wrong
        // )
        return res.json({
            status:500,
            message:"banner_are_wrong",
            success:false
        })
    }
    }




// update banner and Image update
module.exports.updateBanner= async(req,res) =>{
    try {
        if(req.file == undefined){
        const  findbanner = await banner.findOne({_id:req.body._id});
        if(findbanner){
         const add = await banner.updateOne({_id:req.body._id},req.body)
           if (add) {
            return res.json({
                status:200,
                message:"banner_update_success",
                success:true
            });
           }
        }
            }else{
                // responseManagement.sendResponse(
                //     res,400,helpers.banners_not_found
                // )
                const filenames = req.file.filename;
                const bannerData = {
                    banner_name: req.body.banner_name,
                    photo:filenames
                };
                const add = await banner.updateOne({_id: req.body._id},bannerData);
                if (add) {
                    return res.json({
                        status:200,
                        message:"banner_update_successfully",
                        success:true,
                        data:add
                    })  
                }
               
            }
    } catch (error) { 
        // responseManagement.sendResponse(
        //     res,500,helpers.something_update_wrong
        // )
        return res.json({
            status:500,
            message:"err.message || err",
            success:false
        })
    }
}

// search banner

module.exports.searchBanner = async (req, res) => {
    try {
      let SITE_URL = `${process.env.HOST}${process.env.PORT}`
  
      const { banner_name,  } = req.body;
  
      filter = {};    
      if (banner_name) {
        filter.banner_name = { $regex: banner_name, $options: "i" }
      
      }
      let viewData = await banner.find(filter).sort({ createdAt: -1 });
      if (viewData.length > 0) {
        viewData = viewData.map((element) => {
        
          // return
          if (element.photo) {
            let obj = {
              ...element.toObject(),
              photo:` ${SITE_URL}/${element.photo}`
  
            };
            return obj;
          } else {
            return element;
          }
        })
        return res.json({
          status: 200,
          message: "banner view success",
          success: true,
          data: viewData
        })
      } else {
        throw "--"
      }
  
    } catch (error) {
      return res.json({
        status: 400,
        message: "BAD REQUEST",
        success: false
      })
    }
  }


 module.exports.statusUpdate = async(req,res)=>{
   try {
       const {status,_id} = req.body;
       const bannerFind = await banner.findOne({_id})
       
       if (!bannerFind) {
           return res.json({
               status:400,
               success:false,
               message:"banner not found"
           })
       }
 
       if (status === true || status === false) {
           bannerFind.status = status;
           await bannerFind.save();
           return res.json({
               status:200,
               success:true,
               message:"status updated successfully",
               data:bannerFind
           });
       } else{
          return res.json({
               status:400,
               success:false
           })
       }
   } catch (err) {
      return res.json({
           status:500,
           success:false,
           message:err.message
           })
   }
 } 
  



 module.exports.viewBannerStatus = async (req, res) => {
  try {
    var SITE_URL = `${process.env.HOST}${process.env.PORT}`
  //   console.log(">>>>>>>>>>",SITE_URL);
  //   return
    let viewData = await banner.find({status:true}).sort({ createdAt: -1 });
    console.log("viewData",viewData);
  //   return
    if (viewData.length > 0) {
      viewData = viewData.map((element, index) => {
        // console.log(">>>>>>xyz>>>>>>>",viewData)
        // return
        if (element.photo) {
          let obj = {
            ...element.toObject(),
            photo: `${SITE_URL}/${element.photo}`

          };
          console.log(">>>>>>>>>>>>>>>>>",obj);
          
          return obj;

        } else {
          return element;
        }
      })
      return res.json({
        status: 200,
        message: "banner view success",
        success: true,
        data: viewData
      })
    } else {
      return res.json({
            status: 400,
            message: "BAD REQUEST",
            success: false
          })
    }
  } catch (error) {
    console.log("error", error.message);

    // 
  }
} 