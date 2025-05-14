const category =require("../models/category");
const lib = require("../lib/responseManagment");
const { find } = require("../models/product");
// const helpers = require("../helpers/categorymessage.json");


//add category

module.exports.addCategory = async(req,res)=>{
    try {
     
        if(req.file == undefined){
             const add = await category.create(req.body);
                await add.save();
                if(add){

                    // responseManagement.sendResponse(
                    //     res,200,helpers.category_added_success,add
                    // )

                    return res.json({
                        status:200,
                        message:"category_added_success",
                        success:true
                    })
                }
        }else{
            const filenames = req.file.filename;
            // console.log("filenames",filenames);
            const categoryData = {
                category_name: req.body.category_name,
                category_description:req.body.category_description,
               photo:filenames
            }
            const add = await category.create(categoryData);
            await add.save();
            if(add){
                // responseManagement.sendResponse(
                //     res,200,helpers.category_added_success,add
                // )  
                return res.json({
                    status:200,
                    message:"category_added_success",
                    success:true
                
                })
            }
        }
             
    } catch (error) {
        // responseManagement.sendResponse(
        //     // console.log("error",error),
        //     res,500,helpers.category_add_fail
        // )
        return res.json({
            status:500,
            message:"category_add_fail",
            success:false
        })
    }
    }


// category view

    module.exports.viewCategory = async (req, res) => {
        try {
          var SITE_URL = `${process.env.HOST}${process.env.PORT}`
        //   console.log(">>>>>>>>>>",SITE_URL);
        //   return
          let viewData = await category.find({}).sort({ createdAt: -1 });
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
                // console.log(">>>>>>>>>>>>>>>>>",obj);
                
                return obj;
    
              } else {
                return element;
              }
            })
            return res.json({
              status: 200,
              message: "category view success",
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




      // update category
      module.exports.updateCategory= async(req,res) =>{
        try {
            if(req.file == undefined){
            const  findcategory = await category.findOne({_id:req.body._id});
            if(findcategory){
             const add = await category.updateOne({_id:req.body._id},req.body)
               if (add) {
                return res.json({
                    status:200,
                    message:"category_update_success",
                    success:true
                });
               }
            }
                }else{
                   
                    const filenames = req.file.filename;
                    const categoryData = {
                        category_name: req.body.category_name,
                        category_description:req.body.category_description,
                       
                        photo:filenames,
                    };
                    const add = await category.updateOne({_id: req.body._id},categoryData);
                    if (add) {
                        return res.json({
                            status:200,
                            message:"category_update_successfully",
                            success:true,
                            data:add
                        })  
                    }
                   
                }
        } catch (error) { 
            
            return res.json({
                status:500,
                message:"err.message || err",
                success:false
            })
        }
    }

// deleted category
module.exports.deleteCategory = async(req,res)=>{
 
    try {
        const findcategory = await category.findOne({_id:req.body._id});
        
        if(findcategory){
        const deleted = await category.deleteOne({_id:req.body._id})
        // responseManagement.sendResponse(
        //     res,200,helpers.category_deleted_success
        // ) r
        return res.json({
            status:200,
            message:"category_delete_success",
            success:true
        })
        }else{
            // responseManagement.sendResponse(
            //     res,400,helpers.category_notdeleted_success
            // )
            return res.json({
                status:400,
                message:"category_not_delete",
                success:false
            })
        }
    } catch (error) {
        // responseManagement.sendResponse(
        //     res,500,helpers.category_are_wrong
        // )
        return res.json({
            status:500,
            message:"category_are_wrong",
            success:false
        })
    }
    }


    //  search category
    module.exports.searchCategory = async (req, res) => {
        try {
          let SITE_URL = `${process.env.HOST}${process.env.PORT}`
      
          const { category_name} = req.body;
      
          filter = {};    
          if (category_name) {
            filter.category_name = { $regex: category_name, $options: "i" }
          }
          let viewData = await category.find(filter).sort({ createdAt: -1 });
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
              message: "category view success",
              success: true,
              data: viewData
            })
          } else {
            throw "--"
          }
      
        } catch (error) {
            console.log("err",error.message);
            
          return res.json({
            status: 400,
            message: "BAD REQUEST",
            success: false
          })
        }
      }




      // category find
      module.exports.findCategory = async(req,res)=>{
        try {
            const viewData = await category.find({});
            if(viewData){
                return res.json({
                    status:200,
                    message: "category find successfully!",
                    success: true,
                    data:  viewData
                  })
                 
            }else{
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
              const categoryFind = await category.findOne({_id})
              
              if (!categoryFind) {
                  return res.json({
                      status:400,
                      success:false,
                      message:"category not found"
                  })
              }
        
              if (status === true || status === false) {
                  categoryFind.status = status;
                  await categoryFind.save();
                  return res.json({
                      status:200,
                      success:true,
                      message:"status updated successfully",
                      data:categoryFind
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


        module.exports.viewCategoryStatus = async (req, res) => {
          try {
            var SITE_URL = `${process.env.HOST}${process.env.PORT}`
          //   console.log(">>>>>>>>>>",SITE_URL);
          //   return
            let viewData = await category.find({status:true}).sort({ createdAt: -1 });
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
                  // console.log(">>>>>>>>>>>>>>>>>",obj);
                  
                  return obj;
      
                } else {
                  return element;
                }
              })
              return res.json({
                status: 200,
                message: "category view success",
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