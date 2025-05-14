const paymentController = require("../controllers/paymentController");
const express = require("express");
const router = express.Router();

router.post("/createpayment",paymentController.createPaymentIntent);



module.exports = router