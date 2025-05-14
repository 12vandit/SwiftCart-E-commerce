const userModel = require("../models/user")
const categoryModel = require("../models/category")
const productModel = require("../models/product")
const contactUS = require("../models/contact")

module.exports.viewDashboard = async(req,res)=>{
    try {
        const viewUsers = (await userModel.find({role_id:2})).length;
        const viewCategory = (await categoryModel.find()).length;
        const viewProduct = (await productModel.find()).length;
        const viewContacts = (await contactUS.find()).length;
      
            return res.json({
                status:200,
                message: "Dashboard Data List Fetch Successfully!",
                success: true,
                data:  {
                    viewUsers:viewUsers,
                    viewCategory:viewCategory,
                    viewProduct:viewProduct,
                    viewContacts:viewContacts
                }
              })
             
    } catch (error) {
        return res.json({
            status: 400,
            message: error.message||"BAD REQUEST",
            success: false
          })
    }
    }


  // top user api
      module.exports.topUsers = async (req, res) => {
          try {
            var SITE_URL =` ${process.env.HOST}${process.env.PORT}`
            // console.log(">>>>>>>>>>",SITE_URL);
            // return
            let viewData = await userModel.find({ role_id: 2 }).sort({ createdAt: -1 }).limit(5);
            // console.log("viewData",viewData);
            // return
            if (viewData.length > 0) {
              viewData = viewData.map((element, index) => {
                // console.log(">>>>>>xyz>>>>>>>",viewData)
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
                message: "User view success",
                success: true,
                data: viewData
              })
            } else {
              throw "--"
            }
          } catch (error) {
            // console.log("error>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", error);
            return res.json({
              status: 400,
              message: "BAD REQUEST",
              success: false
            })
          }
        }