const dashboardController = require("../controllers/dashboardController");
const express = require("express");
const router = express.Router();

router.get("/viewdashboard",dashboardController.viewDashboard)
router.get("/viewtopuser",dashboardController.topUsers)






module.exports = router