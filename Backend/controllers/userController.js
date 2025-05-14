const user = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")




 // update user

//  module.exports.updateUser = async(req,res) =>{
//     try {
//         const  finduser = await user.findOne({_id:req.body._id});
//         if(finduser){
//             // const a ={name,lastname}=req.body
//             const update = await user.updateOne({_id:req.body._id},req.body)
//             // responseManagement.sendResponse(
//             //     res,200,helpers.user_update_success
//             // )
//             return res.json({
//                 status:200,
//                 message:"user_update_success",
//                 success:true
//             })
//             }else{
//                 // responseManagement.sendResponse(
//                 //     res,400,helpers.users_not_found
//                 // )
//                 return res.json({
//                     status:400,
//                     message:"user_not_found",
//                     success:false
//                 })
//             }
//     } catch (error) { 
//         // responseManagement.sendResponse(
//         //     res,500,helpers.something_update_wrong
//         // )
//         return res.json({
//             status:500,
//             message:"something_update_wrong",
//             success:false
//         })
//     }
// }


// update user and Image update
module.exports.updateUser= async(req,res) =>{
    try {
        if(req.file == undefined){
        const  finduser = await user.findOne({_id:req.body._id});
        if(finduser){
         const add = await user.updateOne({_id:req.body._id},req.body)
           if (add) {
            return res.json({
                status:200,
                message:"user_update_success",
                success:true
            });
           }
        }
            }else{
                // responseManagement.sendResponse(
                //     res,400,helpers.users_not_found
                // )
                const filenames = req.file.filename;
                const userData = {
                    f_name: req.body.f_name,
                    l_name:req.body.l_name,
                    dob:req.body.dob,
                    gender:req.body.gender,
                    address:req.body.address,
                    email:req.body.email,
                    mobile:req.body.mobile,
                    photo:filenames,
                };
                const add = await user.updateOne({_id: req.body._id},userData);
                if (add) {
                    return res.json({
                        status:200,
                        message:"user_update_successfully",
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


   // signup api
   module.exports.signUp = async (req, res) => {
    const { f_name, l_name, email, password, mobile } = req.body;
    try {
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.json({
                status: 400,
                success: false,
                message: 'User Already Exists',
            })
        } else {

            const hashedPassword = await bcrypt.hash(password, 10);

            const filename = req.file.filename
            const data = {
                f_name: f_name,
                l_name: l_name,
                password: hashedPassword,
                email: email,
                mobile: mobile,
                photo: filename,
            }
            const useradd = await user.create(data)
              await useradd.save()
            return res.json({
                status: 200,
                success: true,
                message: 'User Registered Successfully',
                data: useradd
            })
        }
    } catch (error) {
        return res.json({
            status: 500,
            success: false,
            message: error.message || 'Internal Server Error',
        })
    }
}




// // user login

module.exports.loginuser = async (req, res) => {
  const { email, password } = req.body;
  try {
      const users = await user.findOne({ email });
      if (!users) {
          return res.json({
              status: 400,
              success: false,
              message: 'Invalid Email or Password',
          })
      }
      const isValidPassword = await bcrypt.compare(password, users.password);
      if (!isValidPassword) {
          return res.json({
              status: 400,
              success: false,
              message: 'Invalid Email or Password',
          })
      }
      const token = jwt.sign({ usersId: users._id }, process.env.SECRET_KEY,
          {
              expiresIn: '1h',
          }
      );
   
      await users.save();
      return res.json({
          status: 200,
          success: true,
          message: 'Login Successfully',
          token: token,
      })
  } catch (error) {
      console.error(error);
      res.json({
          status: 500,
          success: false,
          message: error.messsage || 'Internal Server Error',
      })
  }
}




// user add and imageUpload
module.exports.addUser = async(req,res)=>{
    try {
     
        if(req.file == undefined){
             const add = await user.create(req.body);
                await add.save();
                if(add){
                    // responseManagement.sendResponse(
                    //     res,200,helpers.user_added_success,add
                    // )

                    return res.json({
                        status:200,
                        message:"user_added_success",
                        success:true
                    })
                }
        }else{
            const filenames = req.file.filename;
            // console.log("filenames",filenames);
            const userData = {
                f_name: req.body.f_name,
                l_name:req.body.l_name,
                dob:req.body.dob,
                gender:req.body.gender,
                address:req.body.address,
                email:req.body.email,
                mobile:req.body.mobile,
                photo:filenames
            }
            const add = await user.create(userData);
            await add.save();
            if(add){
                // responseManagement.sendResponse(
                //     res,200,helpers.user_added_success,add
                // )  
                return res.json({
                    status:200,
                    message:"user_added_success",
                    success:true
                
                })
            }
        }
             
    } catch (error) {
        // responseManagement.sendResponse(
        //     // console.log("error",error),
        //     res,500,helpers.user_add_fail
        // )
        return res.json({
            status:500,
            message:"user_add_fail",
            success:false
        })
    }
    }





    // user view
    // module.exports.viewUser = async (req, res) => {
    //     try {
            
    //         // const viewData = await user.find({role_id:2}).sort({createdAt:-1});
    //         const viewData = await user.find({}).sort({createdAt:-1});

    //         if (viewData) {
    //             // responseManagement.sendResponse(
    //             //     res, 200, helpers.user_view_success, viewData
    //             // )
    
    //             return res.json({
    //                 status:200,
    //                 message:"user_view_success",
    //                 success:true,
    //                 data:viewData
    //             })
    //         } else {
    //             throw "---"
    //         }
    //     } catch (error) {
    //         // responseManagement.sendResponse(
    //         //     req, 500, helpers.user_not_view_success
    //         // )
    
    //         return res.json({
    //             status:500,
    //             message:"user_not_view_success",
    //             success:false
    //         })
    //     }
    // }




// deleted user
module.exports.deleteUser = async(req,res)=>{
 
        try {
            const finduser = await user.findOne({_id:req.body._id});
            
            if(finduser){
            const deleted = await user.deleteOne({_id:req.body._id})
            // responseManagement.sendResponse(
            //     res,200,helpers.user_deleted_success
            // ) r
            return res.json({
                status:200,
                message:"user_delete_success",
                success:true
            })
            }else{
                // responseManagement.sendResponse(
                //     res,400,helpers.user_notdeleted_success
                // )
                return res.json({
                    status:400,
                    message:"user_not_delete",
                    success:false
                })
            }
        } catch (error) {
            // responseManagement.sendResponse(
            //     res,500,helpers.user_are_wrong
            // )
            return res.json({
                status:500,
                message:"user_are_wrong",
                success:false
            })
        }
        }



        
 // search user

 module.exports.searchUser = async (req, res) => {
  // try {
  //   let SITE_URL = `${process.env.HOST}${process.env.PORT}`;

  //   const { f_name, mobile, email } = req.body;

  //   // Initialize the filter object with a mandatory condition for role_id
  //   let filter = { role_id: 2 };

  //   // Add optional filters for f_name, mobile, and email
  //   if (f_name) {
  //     filter.f_name = { $regex: f_name, $options: "i" };
  //   }
  //   if (mobile) {
  //     filter.mobile = { $regex: mobile, $options: "i" };
  //   }
   
  //   if (email) {
  //     filter.email = { $regex: email, $options: "i" };
  //   }

  //   // Fetch users based on the filter
  //   let viewData = await user.find(filter).sort({ createdAt: -1 });

  //   if (viewData.length > 0) {
  //     // Map the data to include the full photo URL if available
  //     viewData = viewData.map((element) => {
  //       if (element.photo) {
  //         let obj = {
  //           ...element.toObject(),
  //           photo: `${SITE_URL}/${element.photo}`, // Add photo URL
  //         };
  //         return obj;
  //       } else {
  //         return element;
  //       }
  //     });

  //     return res.json({
  //       status: 200,
  //       message: "User view success",
  //       success: true,
  //       data: viewData,
  //     });
  //   } else {
  //     throw "--"; // Trigger the catch block if no users found
  //   }
  // } catch (error) {
  //   return res.json({
  //     status: 400,
  //     message: "User not found",
  //     success: false,
  //   });
  // }

     try {
      let SITE_URL = `${process.env.HOST}${process.env.PORT}`;
  
        const {  f_name, mobile, email } = req.body;
        // console.log(">>>>",req.body);
        // return
        
        filter = { role_id: 2};
        if (f_name) {
            filter.f_name = { $regex: f_name, $options: "i" }
        }
        if (mobile) {
          filter.mobile = { $regex: mobile, $options: "i" }
      }
      if (email) {
        filter.email = { $regex: email, $options: "i" }
    }
        let viewData = await user.find(filter).sort({ createdAt: -1 });
        // console.log(">>>>", viewData);
        // return
  
        if (viewData.length > 0) {
            viewData = viewData.map((element) => {
  
                if (element.photo) {
                    let obj = {
                        ...element.toObject(),
                        photo: `${SITE_URL}/${element.photo}`
                    };
                    return obj;
                } else {
                    return element;
                }
            })
            return res.json({
                status: 200,
                message: "user view successfully",
                success: true,
                data: viewData
            })
  
        } else {
            return res.json({
                status: 200,
                message: "user not found",
                success: true,
                data: viewData
            })
        }
  
    } catch (error) {
        return res.json({
            status: 400,
            message: "BAD REQUEST",
            success: false
        })
    }
};








module.exports.viewUser = async (req, res) => {
    try {
      var SITE_URL = `${process.env.HOST}${process.env.PORT}`
    //   console.log(">>>>>>>>>>",SITE_URL);
    //   return
      let viewData = await user.find({role_id:2}).sort({ createdAt: -1 });
      // console.log("viewData",viewData);
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
          message: "User view success",
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




// viewProfile api
  module.exports.viewProfile = async (req, res) => {
    try {
        var SITE_URL = `${process.env.HOST}${process.env.PORT}`
      //   console.log(">>>>>>>>>>",SITE_URL);
      //   return
        let viewData = await user.find({role_id:1}).sort({ createdAt: -1 });
        // console.log("viewData",viewData);
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
            message: "User view success",
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




  // status api

// module.exports.statusUpdate = async(req,res)=>{
//   try {
//       const {status,_id} = req.body;
//       const userFind = await user.findOne({_id})
//       if (!userFind) {
//         return res.json({
//               status:400,
//               success:false,
//               message:"user not found"
//           })
//       }

//       if (status === true || status === false) {
//           userFind.status = status;
//           await userFind.save();
//         return res.json({
//               status:200,
//               success:true,
//               message:"status updated successfully",
//               data:userFind
//           });
//       } else{
//          return res.json({
//               status:400,
//               success:false
//           })
//       }
//   } catch (err) {
//     return res.json({
//           status:400,
//           success:false,
//           message:err.message
//           })
//   }
// } 

module.exports.statusUpdate = async(req,res)=>{
  try {
      const {status,_id} = req.body;
      const userFind = await user.findOne({_id})
      
      if (!userFind) {
          return res.json({
              status:400,
              success:false,
              message:"user not found"
          })
      }

      if (status === true || status === false) {
          userFind.status = status;
          await userFind.save();
          return res.json({
              status:200,
              success:true,
              message:"status updated successfully",
              data:userFind
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


module.exports.viewUserStatus = async (req, res) => {
    try {
      var SITE_URL = `${process.env.HOST}${process.env.PORT}`
    //   console.log(">>>>>>>>>>",SITE_URL);
    //   return
      let viewData = await user.find({role_id:2,status:true}).sort({ createdAt: -1 });
      // console.log("viewData",viewData);
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
          message: "User view success",
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




//   module.exports.updateProfile= async(req,res) =>{
//     try {
//         if(req.file == undefined){
//         const  finduser = await user.findOne({_id:req.body._id});
//         if(finduser){
//          const add = await user.updateOne({_id:req.body._id},req.body)
//            if (add) {
//             return res.json({
//                 status:200,
//                 message:"user_update_success",
//                 success:true
//             });
//            }
//         }
//             }else{
//                 // responseManagement.sendResponse(
//                 //     res,400,helpers.users_not_found
//                 // )
//                 const filenames = req.file.filename;
//                 const userData = {
//                     f_name: req.body.f_name,
//                     l_name:req.body.l_name,
//                     role_id:req.body.role_id,
//                     email:req.body.email,
//                     mobile:req.body.mobile,
//                     photo:filenames,
//                 };
//                 const add = await user.updateOne({_id: req.body._id},userData);
//                 if (add) {
//                     return res.json({
//                         status:200,
//                         message:"user_update_successfully",
//                         success:true,
//                         data:add
//                     })  
//                 }
               
//             }
//     } catch (error) { 
        
//         return res.json({
//             status:500,
//             message:"err.message || err",
//             success:false
//         })
//     }
// }


module.exports.viewUserProfile = async (req, res) => {
  try {
    const SITE_URL = `${process.env.HOST}:${process.env.PORT}`;

    // Check if the request contains a user ID
    const userId = req.body._id;
    if (!userId) {
      return res.status(400).json({
        status: 400,
        message: "User ID is required.",
        success: false, 
      });
    }

    // Fetch user profile by ID
    let viewData = await user.findOne({ _id: userId });
    
    if (viewData) {
      // Append photo URL if available
      if (viewData.photo) {
        viewData = {
          ...viewData.toObject(),
          photo: `${SITE_URL}/${viewData.photo}`,
        };
      }
      
      return res.status(200).json({
        status: 200,
        message: "User profile fetched successfully.",
        success: true,
        data: viewData,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "User not found.",
        success: false,
      });
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      success: false,
    });
  }
};



module.exports.editUserprofile= async(req,res) =>{
  try {
      if(req.file == undefined){
      const  finduser = await user.findOne({_id:req.body._id});
      if(finduser){
       const add = await user.updateOne({_id:req.body._id},req.body)
         if (add) {
          return res.json({
              status:200,
              message:"user_update_success",
              success:true
          });
         }
      }
          }else{
              // responseManagement.sendResponse(
              //     res,400,helpers.users_not_found
              // )
              const filenames = req.file.filename;
              const userData = {
                  f_name: req.body.f_name,
                  l_name:req.body.l_name,
                  dob:req.body.dob,
                  gender:req.body.gender,
                  address:req.body.address,
                  email:req.body.email,
                  mobile:req.body.mobile,
                  photo:filenames,
              };
              const add = await user.updateOne({_id: req.body._id},userData);
              if (add) {
                  return res.json({
                      status:200,
                      message:"user_update_successfully",
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