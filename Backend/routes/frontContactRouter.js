const controllers = require("../controllers/frontContactController")
const express = require("express");
const router = express.Router();

router.post("/front-contact-add" ,controllers.addFronContact)




module.exports = router
