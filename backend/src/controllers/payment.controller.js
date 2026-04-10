const paymentModel = require("../models/payment.model");
const orderModel = require("../models/order.model");
const AppError = require("../utils/ApiError.utils");

/**
 * 1. createPayment: Payment initiate karne ke liye
 */
const createPayment = async (req, res, next) => {
    try {
        const { orderId, paymentMethod } = req.body;

        // Check if order exists
        const order = await orderModel.findById(orderId);
        if (!order) {
            throw new AppError(404, "Order not found");
        }

        // Create a pending payment record
        const payment = await paymentModel.create({
            order: orderId,
            paymentMethod,
            amount: order.totalAmount,
            status: "pending"
        });

        return res.status(201).json({
            success: true,
            message: "Payment initiated",
            data: payment
        });
    } catch (err) {
        next(err);
    }
};

/**
 * 2. processPayment (Dummy): Simulation of a gateway
 */
const processPayment = async (req, res, next) => {
    try {
        const paymentId  = req.params.paymentId;
        const { simulateSuccess } = req.body; // Client bhej sakta hai true/false testing ke liye

        const payment = await paymentModel.findById(paymentId);
        if (!payment) {
            throw new AppError(404, "Payment record not found");
        }

        // Dummy processing logic
        const status = simulateSuccess !== false ? "completed" : "failed";
        
        // Update payment and order using our internal helper
        const updatedPayment = await updatePaymentStatus(paymentId, status);

        return res.status(200).json({
            success: status === "completed",
            message: `Payment ${status}`,
            data: updatedPayment
        });
    } catch (err) {
        next(err);
    }
};

/**
 * 3. updatePaymentStatus & 4. updateOrderAfterPayment (Utility Functions)
 * Ye controller ke andar hi internal logic handle karenge
 */
const updatePaymentStatus = async (paymentId, status) => {
    const payment = await paymentModel.findById(paymentId);
    
    payment.status = status;
    if (status === "completed") {
        payment.paidAt = new Date();
    }
    await payment.save();

    // Jab payment status update ho jaye, order ko sync karo
    await updateOrderAfterPayment(payment.order, status);
    
    return payment;
};

const updateOrderAfterPayment = async (orderId, paymentStatus) => {
    const order = await orderModel.findById(orderId);
    if (!order) return;

    if (paymentStatus === "completed") {
        order.status = "processing"; // Payment milte hi 'pending' se 'processing'
        // Aap order model mein payment details ya "isPaid" flag bhi add kar sakte hain
    } else if (paymentStatus === "failed") {
        // Option: Agar payment fail ho toh order cancel kar dein ya pending rehne dein
        // Hum yahan pending hi chhod rahe hain taaki user retry kar sake
        order.status = "pending"
    }
    
    await order.save();
};

/**
 * 5. getPaymentDetails: Specific payment track karne ke liye
 */
const getPaymentByOrderId = async (req, res, next) => {
    try {
        const orderId  = req.params.orderId;
        const payment = await paymentModel.findOne({ order: orderId });

        if (!payment) {
            throw new AppError(404, "No payment records found for this order");
        }

        return res.status(200).json({
            success: true,
            data: payment
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createPayment,
    processPayment,
    getPaymentByOrderId
};