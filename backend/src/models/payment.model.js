const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    amount: {   
        type: Number,
        required: true,
        min: 0,
    },
    transactionId: {
        type: String,
        required: true,
        unique: true,
        default: () => "txn_" + Date.now() + Math.floor(Math.random()*1000)
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "completed", "failed"],
        default: "pending",
    },
    paidAt: {
        type: Date,
    },
}, { timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;