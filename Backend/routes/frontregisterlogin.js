const controllers = require("../controllers/fronregisterController")
const express = require("express");
const imageUpload = require("../middlewares/fileUpload")
const router = express.Router();

router.post("/front-register",imageUpload.fileUpload.single('photo'), controllers.frontRegister)
router.post("/front-login",controllers.frontLogin)
router.get("/frontuser",controllers.viewUserFront)





module.exports = router
