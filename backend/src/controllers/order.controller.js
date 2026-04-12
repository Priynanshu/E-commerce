const orderModel = require("../models/order.model");
const productModel = require("../models/product.model");
const AppError = require("../utils/ApiError.utils");
const cartModel = require("../models/cart.model"); // ✅ Cart model import karo

const createOrder = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { items, address, fromCart } = req.body; // ✅ fromCart flag

        let itemsToProcess = [];

        // ✅ Case 1 - Cart se order
        if (fromCart) {
            const cart = await cartModel.findOne({ user: userId });
            if (!cart || cart.items.length === 0) {
                throw new AppError(400, "Cart is empty");
            }
            itemsToProcess = cart.items; // cart ke items use karo

        // ✅ Case 2 - Direct order (Buy Now)
        } else {
            if (!items || items.length === 0) {
                throw new AppError(400, "Items are required");
            }
            itemsToProcess = items;
        }

        if (!address) {
            throw new AppError(400, "Address is required");
        }

        // Validate items & calculate total
        let totalPrice = 0;
        const validatedItems = [];

        for (const item of itemsToProcess) {
            const product = await productModel.findById(item.product);

            if (!product) {
                throw new AppError(404, `Product not found: ${item.product}`);
            }
            if (product.stock < item.quantity) {
                throw new AppError(400, `Insufficient stock for: ${product.name}`);
            }

            totalPrice += product.price * item.quantity;
           
            validatedItems.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price,
            });
        }

        const order = await orderModel.create({
            user: userId,
            items: validatedItems,
            totalAmount: totalPrice,
            address,
            status: "pending",
        });

        // Stock reduce karo
        for (const item of validatedItems) {
            await productModel.findByIdAndUpdate(item.product, {
                $inc: { stock: -item.quantity }
            });
        }

        // ✅ Cart se order tha toh cart clear karo
        if (fromCart) {
            await cartModel.findOneAndUpdate(
                { user: userId },
                { items: [], totalPrice: 0 }
            );
        }

        return res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: order,
        });
    } catch (err) {
        console.log(err)
        next(err);
    }
};

const getOrders = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const orders = await orderModel
            .find({ user: userId })
            .populate("items.product")
            .populate("address") // ✅ address populate
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: orders,
            totalOrders: orders.length
        });
    } catch (err) {
        next(err);
    }
};

const getAllOrders = async (req, res, next) => {
    try {
        const orders = await orderModel
            .find()
            .populate("items.product")
            .populate("user", "name email")
            .populate("address")
            .sort({ createdAt: -1 });

            const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

        return res.status(200).json({
            success: true,
            message: "All orders fetched successfully",
            data: orders,
            totalRevenue,
            totalOrders: orders.length
        });
    } catch (err) {
        next(err);
    }
};

const getOrderById = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const orderId = req.params.id;
        const order = await orderModel
            .findOne({ _id: orderId, user: userId })
            .populate("items.product")
            .populate("address"); // ✅ address populate

        if (!order) {
            throw new AppError(404, "Order not found");
        }

        return res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            data: order
        });
    } catch (err) {
        next(err);
    }
};

// ✅ Order history - sirf delivered orders
const getOrderHistory = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const orders = await orderModel
            .find({ user: userId, status: "delivered" })
            .populate("items.product")
            .populate("address")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Order history fetched successfully",
            data: orders,
            totalOrders: orders.length
        });
    } catch (err) {
        next(err);
    }
};

const updateOrderStatus = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        const { status } = req.body;

        const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
        if (!validStatuses.includes(status)) {
            throw new AppError(400, "Invalid status");
        }

        const order = await orderModel.findById(orderId);
        if (!order) {
            throw new AppError(404, "Order not found");
        }

        // ✅ Delivered order ka status change mat karo
        if (order.status === "delivered") {
            throw new AppError(400, "Delivered order cannot be updated");
        }

        order.status = status; // ✅ status assign karo
        await order.save();    // ✅ save karo

        return res.status(200).json({
            success: true,
            message: `Order status updated to ${status}`,
            data: order
        });
    } catch (err) {
        next(err);
    }
};

// ✅ Cancel order - delivered ho chuka hai toh cancel nahi hoga
const cancelOrder = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const orderId = req.params.id;

        const order = await orderModel.findOne({ _id: orderId, user: userId });
        if (!order) {
            throw new AppError(404, "Order not found");
        }

        if (order.status === "delivered") {
            throw new AppError(400, "Delivered order cannot be cancelled");
        }

        if (order.status === "cancelled") {
            throw new AppError(400, "Order is already cancelled");
        }

        // ✅ Stock wapas karo
        for (const item of order.items) {
            await productModel.findByIdAndUpdate(item.product, {
                $inc: { stock: item.quantity }
            });
        }

        order.status = "cancelled";
        await order.save();

        return res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
            data: order
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createOrder,
    getOrders,
    getAllOrders,
    getOrderById,
    getOrderHistory, 
    cancelOrder,    
    updateOrderStatus
};