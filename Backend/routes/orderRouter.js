const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/orderfind', orderController.viewOrder); 
router.post('/orderdelete', orderController.deleteOrder); 




module.exports = router;
