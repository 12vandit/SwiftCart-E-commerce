const product = require("../models/product");



//update api 
// module.exports.updateProduct = async (req, res) => {
//     try {
//       if (req.file == undefined) {
//         var findProduct = await product.findOne({ _id: req.body._id });
//         // console.log(":::::::::::::::::::::::::::::",findProduct)
//         if (findProduct) {
//           var add = await product.updateOne( { _id: req.body._id },req.body);
//           if (add) {
//             res.status(200).json({
//               message: "Product Update Puccessfully",
//               success: true,
//               error: false,
//               data: add,
//             });
//         }
//         }
//       } else {
//         const filenames = req.file.filename;
//         var productData = {
//           product_name: req.body.product_name,
//           product_description: req.body.product_description,
//           product_price: req.body.product_price,
//           product_category: req.body.product_category,
//           product_stock_quantity: req.body.product_stock_quantity,
//           photo: filenames,
//         };
//         let add = await product.updateOne({ _id: req.body._id },productData);
//         if (add) {
//           res.status(200).json({
//             message: "Product Update Successfully",
//             success: true,
//             error: false,
//             data: add,
//           });
//         }
//       }
//     } catch (err) {
//       res.json({
//         message: err.message || err,
//         error: true,
//         success: false,
//       });
//     }
//   };

  // module.exports.updateProduct = async (req, res) => {
  //   try {
  //     if (req.file == undefined) {
  //       const findProduct = await product.findOne({ _id: req.body._id }).populate('category_id');
  //       // console.log(":::::::::::::::::::::::::::::",findProduct)
  //       if (findProduct) {
  //         const add = await product.updateOne( { _id: req.body._id },req.body);
  //         if (add) {
  //           res.status(200).json({
  //             message: "Product Update Puccessfully",
  //             success: true,
  //             error: false,
  //             data: add,
  //           });
  //       }
  //       }
  //     } else {
  //       const filenames = req.file.filename;
  //       const productData = {
  //           product_name: req.body.product_name,
  //           product_description: req.body.product_description,
  //           product_price: req.body.product_price,
  //           product_category: req.body.product_category,
  //           product_stock_quantity: req.body.product_stock_quantity,
  //           photo: filenames,
  //       };
  //       const add = await product.updateOne({ _id: req.body._id },productData);
  //       if (add) {
  //         res.status(200).json({
  //           message: "Product Update Successfully",
  //           success: true,
  //           error: false,
  //           data: add,
  //         });
  //       }
  //     }
  //   } catch (err) {
  //     res.json({
  //       message: err.message || err,
  //       error: true,
  //       success: false,
  //     });
  //   }
  // };
  
  module.exports.updateProduct = async (req, res) => {
    try {
      if (req.file == undefined) {
        const findProduct = await product.findOne({ _id: req.body._id });
        // console.log(":::::::::::::::::::::::::::::",findProduct)
        if (findProduct) {
          const add = await product.updateOne( { _id: req.body._id },req.body);
          if (add) {
            res.status(200).json({
              message: "Product Update Successfully",
              success: true,
              error: false,
              data: add,
            });
        }
        }
      } else {
        const filenames = req.file.filename;
        const productData = {
            product_name: req.body.product_name,
            product_description: req.body.product_description,
            product_price: req.body.product_price,
            product_category: req.body.product_category,
            product_stock_quantity: req.body.product_stock_quantity,
            photo: filenames,
        };
        const add = await product.updateOne({ _id: req.body._id },productData);
        if (add) {
          res.status(200).json({
            message: "Product Update Successfully",
            success: true,
            error: false,
            data: add,
          });
        }
      }
    } catch (err) {
      res.json({
        message: err.message || err,
        error: true,
        success: false,
      });
    }
  };

// product imageUpload addd





module.exports.addproduct = async (req, res) => {
    try {

        if (req.file == undefined) {
            const add = await product.create(req.body);
            await add.save();

            if (add) {
                // console.log(add, "add");
                return res.json({
                    status: 200,
                    message: "product_added_success",
                    success: true
                })
            }
        } else {
            const filenames = req.file.filename;
            // console.log("filenames",filenames);
            const productData = {
                product_name: req.body.product_name,
                product_description: req.body.product_description,
                product_price: req.body.product_price,
                product_category: req.body.product_category,
                product_stock_quantity: req.body.product_stock_quantity,
                photo: filenames
            }
            const add = await product.create(productData);
            await add.save();
            if (add) {
                return res.json({
                    status: 200,
                    message: "product_added_success",
                    success: true

                })
            }
        }

    } catch (error) {
       
        return res.json({
            status: 500,
            message: "product_add_fail",
            success: false
        })
    }
}






// deleted product
module.exports.deleteproduct = async (req, res) => {

    try {
        const findproduct = await product.findOne({ _id: req.body._id });

        if (findproduct) {
            const deleted = await product.deleteOne({ _id: req.body._id })
           
            return res.json({
                status: 200,
                message: "product_delete_success",
                success: true
            })
        } else {
            
            return res.json({
                status: 400,
                message: "product_not_delete",
                success: false
            })
        }
    } catch (error) {
       
        return res.json({
            status: 500,
            message: "product_are_wrong",
            success: false
        })
    }
}




// search product

module.exports.searchProduct = async (req, res) => {
    // try {
    //   let SITE_URL = `${process.env.HOST}${process.env.PORT}`
  
    //   const { product_name, product_category } = req.body;
  
    //   filter = {};    
    //   if (product_name) {
    //     filter.product_name = { $regex: product_name, $options: "i" }
    //   }
    //   if (product_category) {
    //     filter.product_category = product_category
    //   }
    //   let viewData = await product.find(filter).populate("product_category").sort({ createdAt: -1 });
    //   if (viewData.length > 0) {
    //     viewData = viewData.map((element) => {
        
    //       if (element.photo) {
    //         let obj = {
    //           ...element.toObject(),
    //           photo:` ${SITE_URL}/${element.photo}`
  
    //         };
    //         return obj;
    //       } else {
    //         return element;
    //       }
    //     })
    //     return res.json({
    //       status: 200,
    //       message: "product view success",
    //       success: true,
    //       data: viewData
    //     })
    //   } 
  
    // } catch (error) {
    //   return res.json({
    //     status: 400,
    //     message: "Product are not found",
    //     success: false
    //   })
    // }

    try {
     let SITE_URL = `${process.env.HOST}${process.env.PORT}`
      const { product_name,product_category  } = req.body;
      // console.log(">>>>",req.body);
      // return
      
      filter = {};
      if (product_name) {
          filter.product_name = { $regex: product_name, $options: "i" }
      }
      if (product_category) {
            filter.product_category = product_category
          }
            let viewData = await product.find(filter).populate("product_category").sort({ createdAt: -1 });

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
              message: "product view successfully",
              success: true,
              data: viewData
          })

      } else {
          return res.json({
              status: 200,
              message: "product not found",
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
  }




// viewproduct
  module.exports.viewproduct = async (req, res) => {
    try {
      const SITE_URL = `${process.env.HOST}${process.env.PORT}`
      // console.log(">>>>>>>>>>",SITE_URL);
      // return
      let viewData = await product.find({}).sort({ createdAt: -1 }).populate("product_category")
      if (viewData.length > 0) {
        viewData = viewData.map((element, index) => {
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
          message: "Product view success",
          success: true,
          data: viewData
        })
      } else {
         return res.json({
        status: 400,
        message: "Data not found",
        success: false
      })
      }
    } catch (error) {
      console.log("error>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", error);
  
      
    }
  }


// product List
module.exports.productlist = async(req,res) =>{
  try {
    let SITE_URL = `${process.env.HOST}${process.env.PORT}`
    let viewData=await product.find({product_category:req.query.product_category})
    if (viewData.length > 0) {
      viewData = viewData.map((element, index) => {
        if (element.photo) {
          let obj = {
            ...element.toObject(),
            photo: `${SITE_URL}/${element.photo}`
          }
          return obj;
        } else{
          return element
        }
      })
      return res.json({
        status:200,
        message:"productlist_sucessfully",
        success:true,
        data:viewData
      })
    }else{
      throw"..."
      }

  }catch(error){
    return res.json({
      status:400,
      message:"Bad request",
      success:false
    })
  }
} 


//product One
module.exports.productOne = async(req,res) =>{
  try {
    let SITE_URL = `${process.env.HOST}${process.env.PORT}`
    let viewData=await product.find({_id:req.query._id})
    if (viewData.length > 0) {
      viewData = viewData.map((element, index) => {
        if (element.photo) {
          let obj = {
            ...element.toObject(),
            photo: `${SITE_URL}/${element.photo}`
          }
          return obj;
        } else{
          return element
        }
      })
      return res.json({
        status:200,
        message:"productlist_sucessfully",
        success:true,
        data:viewData
      })
    }else{
      throw"..."
      }

  }catch(error){
    return res.json({
      status:400,
      message:"Bad request",
      success:false
    })
  }
}



module.exports.statusUpdate = async(req,res)=>{
  try {
      const {status,_id} = req.body;
      const productFind = await product.findOne({_id})
      
      if (!productFind) {
          return res.json({
              status:400,
              success:false,
              message:"product not found"
          })
      }

      if (status === true || status === false) {
          productFind.status = status;
          await productFind.save();
          return res.json({
              status:200,
              success:true,
              message:"status updated successfully",
              data:productFind
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





// deleted cart product
module.exports.deleteproductcart = async (req, res) => {

  try {
      const findproduct = await product.findOne({ _id: req.body._id });

      if (findproduct) {
          const deleted = await product.deleteOne({ _id: req.body._id })
         
          return res.json({
              status: 200,
              message: "product_delete_success",
              success: true
          })
      } else {
          
          return res.json({
              status: 400,
              message: "product_not_delete",
              success: false
          })
      }
  } catch (error) {
     
      return res.json({
          status: 500,
          message: "product_are_wrong",
          success: false
      })
  }
}



module.exports.viewproductStatus = async (req, res) => {
  try {
    const SITE_URL = `${process.env.HOST}${process.env.PORT}`
    // console.log(">>>>>>>>>>",SITE_URL);
    // return
    let viewData = await product.find({status:true}).sort({ createdAt: -1 }).populate("product_category")
    if (viewData.length > 0) {
      viewData = viewData.map((element, index) => {
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
        message: "Product view success",
        success: true,
        data: viewData
      })
    } else {
       return res.json({
      status: 400,
      message: "Data not found",
      success: false
    })
    }
  } catch (error) {
    console.log("error>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", error);

    
  }
}