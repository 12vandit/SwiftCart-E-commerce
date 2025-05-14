
const orderModel = require('../models/order');
const productModel = require('../models/product');
const cart = require('../models/cart');


const stripe = require("stripe")(process.env.STRIPE_API_SECRET_KEY);

// module.exports.createPaymentIntent = async (req, res) => {
//     const { product_price, userId, productId } = req.body;

//     try {
        
//         const product = await productModel.findById(productId);
//         console.log("product",product);
        
//         if (!product) {
//             return res.json({
//                 status:200,
//                 success: false,
//                 message: "Product not found",
//             });
//         }
//         // Create a Stripe Checkout Session
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             line_items: [
//                 {
//                     price_data: {
//                         currency: 'INR',
//                         product_data: {
//                             name: product.product_name,
//                         },
//                         unit_amount: product_price, // Price in the smallest currency unit (paise for INR)
//                     },
//                     quantity: 1,
//                 },
//             ],
//             mode: 'payment',
//             success_url: 'http://localhost:3000/PaymentSuccess',
//             cancel_url: 'http://localhost:3000/cancel',
//         });

//         // Save the order in the database
//         await orderModel.create({
//             userId,
//             productId,
//         });

//        return res.status(200).json({
//             success: true,
//             data: session,
//         });

//   // Start checking the payment status
//   const interval = setInterval(async () => {
//     try {
//         const sessionStatus = await stripe.checkout.sessions.retrieve(session.id);
//         if (sessionStatus.payment_status === 'paid') {
//             // Remove items from the cart
//             await cart.deleteMany({ userId });
//             clearInterval(interval); // Stop checking once payment is confirmed
//             console.log("Payment successful and cart items removed.");
//         }
//     } catch (error) {
//         console.error("Error checking payment status:", error.message);
//         clearInterval(interval); // Stop checking if an error occurs
//     }
// }, 2000); // Check every 2 seconds


//     } catch (err) {
//        return res.json({
//             status:500,
//             success: false,
//             message: err.message,
//         });
//     }
// };




module.exports.createPaymentIntent = async (req, res) => {
    const { product_price, userId, productId } = req.body;

    try {
        const product = await productModel.findById(productId);

        if (!product) {
            return res.json({
                status: 200,
                success: false,
                message: "Product not found",
            });
        }

        // Create a Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'INR',
                        product_data: {
                            name: product.product_name,
                        },
                        unit_amount: product_price, // Price in the smallest currency unit (paise for INR)
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/PaymentSuccess',
            cancel_url: 'http://localhost:3000/cancel',
        });

        // Save the order in the database
        await orderModel.create({
            userId,
            productId,
        });

        // Start checking the payment status
        const interval = setInterval(async () => {
            try {
                const sessionStatus = await stripe.checkout.sessions.retrieve(session.id);
                if (sessionStatus.payment_status === 'paid') {
                    // Remove items from the cart
                    await cart.deleteMany({ userId });
                    clearInterval(interval); // Stop checking once payment is confirmed
                    console.log("Payment successful and cart items removed.");
                }
            } catch (error) {
                console.error("Error checking payment status:", error.message);
                clearInterval(interval); // Stop checking if an error occurs
            }
        }, 2000); // Check every 2 seconds

        // Send the response to the client after starting the interval
        return res.status(200).json({
            success: true,
            data: session,
        });

    } catch (err) {
        return res.json({
            status: 500,
            success: false,
            message: err.message,
        });
    }
};

