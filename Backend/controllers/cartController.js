const Cart = require('../models/cart'); // Import the Cart model

module.exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Validate input
        if (!userId || !productId || quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Invalid input: userId, productId, and quantity are required.",
            });
        }

        // Check if the product already exists in the cart for this user
        const existingCartItem = await Cart.findOne({ userId, productId });

        if (existingCartItem) {
            // If product exists, update the quantity
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
            return res.json({
                success: true,
                message: "Product quantity updated in cart.",
                data: existingCartItem,
            });
        }

        // Create a new cart item
        const newCartItem = new Cart({ userId, productId, quantity });
        await newCartItem.save();

        return res.json({
            success: true,
            message: "Product added to cart successfully.",
            data: newCartItem,
        });
    } catch (err) {
        console.error("Error adding to cart:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to add product to cart.",
        });
    }

};


module.exports.viewCart = async (req, res) => {
    try {
        const { userId } = req.body;

        // Define the site URL from environment variables
        const SITE_URL = `${process.env.HOST}${process.env.PORT}`;

        // Validate input
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required.",
            });
        }

        // Fetch cart items for the user
        let cartItems = await Cart.find({ userId }) .populate('productId') // Populate product details
 .sort({ createdAt: -1 }); // Sort by the most recent

        if (cartItems.length > 0) {
            // Map through the cart items and apply the `viewData` logic
            const viewData = cartItems.map((element) => {
                // Check for the presence of the photo field
                if (element.productId && element.productId.photo) {
                    return {
                        ...element.toObject(),
                        productId: {
                            ...element.productId.toObject(),
                            photo: `${SITE_URL}/${element.productId.photo}`,
                        },
                    };
                } else {
                    return element.toObject(); // Convert to plain object
                }
            });

            return res.status(200).json({
                success: true,
                message: "User view success.",
                data: viewData,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "No items found in the cart.",
            });
        }
    } catch (err) {
        console.error("Error fetching cart data:", err);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching the cart data.",
        });
    }
};



module.exports.deleteFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        // Validate input
        if (!userId || !productId) {
            return res.status(400).json({
                success: false,
                message: "User ID and Product ID are required.",
            });
        }

        // Find the cart item to delete
        const cartItem = await Cart.findOne({ userId, productId });

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found.",
            });
        }

        // Delete the cart item
        await cartItem.deleteOne();

        return res.json({
            success: true,
            message: "Product removed from cart successfully.",
        });
    } catch (err) {
        console.error("Error deleting from cart:", err);
        return res.status(500).json({
            success: false,
            message: "Failed to remove product from cart.",
        });
    }
};





// module.exports.processOrder = async (req, res) => {
//     try {
//       const { userId, cartItems } = req.body;
  
//       // Validate input data
//       if (!userId) {
//         return res.status(400).json({ success: false, message: 'User ID is required' });
//       }
//       if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
//         return res.status(400).json({ success: false, message: 'Cart items are required and cannot be empty' });
//       }
  
//       // Process the order
//       const order = await Cart.create({ userId, items: cartItems });
  
//       // Send success response
//       res.json({ success: true, message: 'Order processed successfully!', order });
//     } catch (error) {
//       // Log the error and send response
//       console.error('Error processing order:', error);
//       res.status(500).json({ success: false, message: 'Failed to process order', error: error.message });
//     }
//   };
  


// module.exports.Orderview = async (req, res) => {

  
//     try {
//     const { userId } = req.body;

//       const orders = await Cart.find({ userId }).populate('items.productId');
  
//       res.json({ success: true, orders });
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//       res.status(500).json({ success: false, message: 'Failed to fetch orders' });
//     }
//   };
  