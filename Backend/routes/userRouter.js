const userController = require("../controllers/userController")
const express = require("express");
const imageUpload = require("../middlewares/fileUpload")
const router = express.Router();

router.post("/adduser",imageUpload.fileUpload.single('photo'),userController.addUser);
router.post("/userdelete",userController.deleteUser);
router.post("/singup",imageUpload.fileUpload.single('photo'),userController.signUp);
router.post("/loginuser",userController.loginuser);
router.post("/searchuser",userController.searchUser);
router.get("/viewuser",userController.viewUser);
router.get('/view-profile',userController.viewProfile);
router.post("/status-update",userController.statusUpdate);
router.get("/viewuserstatus",userController.viewUserStatus);


router.put("/updateimage",imageUpload.fileUpload.single('photo'),userController.updateUser);

router.post('/userprofile', userController.viewUserProfile);
router.put('/edituserprofile',imageUpload.fileUpload.single('photo'), userController.editUserprofile);





module.exports = router; 