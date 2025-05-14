const order = require("../models/order")

module.exports.viewOrder = async (req, res) => {
    try {
        const findOrder = await order.find().populate("userId", "f_name email mobile").populate("productId", "product_name product_price");
        console.log(">>>>>>>>>>>>>",findOrder);
        
        if (findOrder && findOrder.length > 0) {
            return res.json({
                ststus:200,
                success: true,
                message: "Order Find Successfully",
                data: findOrder
            });
        
        }
    } catch (err) {
        return res.json({
            status: 500,
            success: false,
            message: err.message
        });
    }
}

module.exports.deleteOrder = async(req,res)=>{
 
        try {
            const findorder = await order.findOne({_id:req.body._id});
            if(findorder){
            const deleted = await order.deleteOne({_id:req.body._id})
           return res.json({
                status:200,
                message:"order_delete_success",
                success:true
            })
            }
        } catch (error) {
            return res.json({
                status:500,
                message:"order_are_wrong",
                success:false
            })
        }
        }


