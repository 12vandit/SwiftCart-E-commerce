const express = require("express");
const router = express.Router();
const contactUs = require("../controllers/contactController")
const contactUsValidator=require("../validations/contactValidation")



router.post("/addContactUs",contactUsValidator.insertContactUs,contactUs.addContactUs);
router.get("/viewContactUs",contactUs.viewContactUs)
router.post("/deleteContactUs",contactUs.deleteContactUs)
router.put("/editContactUs",contactUs.updateContactUs)


module.exports = router;