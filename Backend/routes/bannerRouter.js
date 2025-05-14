const bannerController = require("../controllers/bannerController")
const express = require("express");
const imageUpload = require("../middlewares/fileUpload")
const router = express.Router();


router.post("/addbanner",imageUpload.fileUpload.single('photo'),bannerController.addBanner);
router.get("/viewbanner",bannerController.viewBanner);
router.post("/deletebanner",bannerController.deleteBanner);
router.post("/searchbanner",bannerController.searchBanner);

router.put('/status-update',bannerController.statusUpdate);

router.put("/updatebanner",imageUpload.fileUpload.single('photo'),bannerController.updateBanner);

router.get("/viewbannerstatus",bannerController.viewBannerStatus);




module.exports = router; 