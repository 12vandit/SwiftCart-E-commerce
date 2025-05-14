const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController'); // Path to the controller

// Add-to-cart API
router.post('/add-to-cart', cartController.addToCart);
router.post('/cart-view', cartController.viewCart);
router.post('/cart-delete', cartController.deleteFromCart);
// router.post('/process-order', cartController.processOrder);
// router.post('/order-view', cartController.Orderview);







module.exports = router;
