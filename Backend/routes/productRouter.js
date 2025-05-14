const productController = require("../controllers/productController")
const express = require("express");
const imageUpload = require("../middlewares/fileUpload")
const router = express.Router();


// router.post("/addproduct",imageUpload.fileUpload.single('photo'),productController.addProduct);

router.post("/addproduct",imageUpload.fileUpload.single('photo'),productController.addproduct);
router.post("/deleteproduct",productController.deleteproduct);
router.get("/viewproduct",productController.viewproduct);
router.post("/searchproduct",productController.searchProduct);
router.put("/updateproductimage",imageUpload.fileUpload.single('photo'),productController.updateProduct);
router.get("/product-list",productController.productlist)
router.get("/product-one",productController.productOne)
router.post("/status-productupdate",productController.statusUpdate);
router.post("/deleteproductcart",productController.deleteproductcart);
router.get("/viewstatustrue",productController.viewproductStatus);









module.exports = router; 