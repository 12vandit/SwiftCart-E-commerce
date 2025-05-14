const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true, },
    quantity: {type: Number,default: 1, },


}, {
    timestamps: true
});

module.exports = mongoose.model('order', OrderSchema);
