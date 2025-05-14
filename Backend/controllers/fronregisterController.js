const front = require("../models/user")

const bcrypt = require('bcrypt')
const jwt =  require('jsonwebtoken')


//front register api
module.exports.frontRegister = async (req, res) => {
    const { f_name, l_name, email, password, mobile } = req.body;
    try {
        const existingUser = await front.findOne({ email });
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
            const useradd = await front.create(data)
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


//front login api
module.exports.frontLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await front.findOne({ email });
        if (!user) {
            return res.json({
                status: 400,
                success: false,
                message: 'Invalid Email or Password',
            })
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.json({
                status: 400,
                success: false,
                message: 'Invalid Email or Password',
            })
        }
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY,
            {
                expiresIn: '1h',
            }
        );
        const refreshToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY,
            {
                expiresIn: '1d',
            }
        );
        user.refreshToken = refreshToken;
        await user.save();
        return res.json({
            status: 200,
            success: true,
            message: 'Login Successfully',
            token: token,
            refreshToken: refreshToken,
            _id: user._id
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


  module.exports.viewUserFront = async (req, res) => {
    try {
      var SITE_URL = `${process.env.HOST}${process.env.PORT}`
    //   console.log(">>>>>>>>>>",SITE_URL);
    //   return
      let viewData = await user.find({userId}).sort({ createdAt: -1 });
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

// view product API with Category Relationship

// module.exports.frontRelation = async(req,res)=>{
//     try {
//         const findcategory = await front.find().populate("cat_id")
//         if (findcategory) {
//            return res.json({
//                 status:200,
//                 success:true,
//                 message:"category find successfully",
//                 data:findcategory
//             });
//         }
//     } catch (err) {
//        return res.json({
//             status:500,
//             success:false,
//             message:err.message|| "error"
//         })
//     }
// }