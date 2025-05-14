const categoryController = require("../controllers/categoryController");
const express = require("express");
const imageUploade = require("../middlewares/fileUpload")
const router = express.Router();

router.post("/add-category",imageUploade.fileUpload.single("photo"),categoryController.addCategory)
router.get("/viewcategory",categoryController.viewCategory)
router.put("/updatecategory",imageUploade.fileUpload.single("photo"),categoryController.updateCategory)
router.post("/deletecategory",categoryController.deleteCategory)
router.post("/searchcategory",categoryController.searchCategory)
router.get("/find-category",categoryController. findCategory)
router.get("/viewcategorystatus",categoryController.viewCategoryStatus)
router.post("/status-update-category",categoryController.statusUpdate);


module.exports = router