const cartModel = require("../models/cart.model");
const productModel = require("../models/product.model");
const AppError = require("../utils/ApiError.utils");

// ✅ Helper - hamesha fresh totalPrice calculate karo
const calculateTotalPrice = async (items) => {
    let total = 0;
    for (const item of items) {
        const product = await productModel.findById(item.product);
        if (product) {
            total += product.price * item.quantity;
        }
    }
    return total;
};

const addToCart = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            throw new AppError(400, "Product ID and quantity are required");
        }

        const product = await productModel.findById(productId);
        if (!product) {
            throw new AppError(404, "Product not found");
        }
        if (product.stock < quantity) {
            throw new AppError(400, "Insufficient stock");
        }

        let cart = await cartModel.findOne({ user: userId });

        if (!cart) {
            cart = await cartModel.create({
                user: userId,
                items: [{ product: productId, quantity }],
                totalPrice: product.price * quantity,
            });
        } else {
            const itemIndex = cart.items.findIndex(
                (item) => item.product.toString() === productId
            );

            if (itemIndex > -1) {
                // ✅ Stock check updated quantity ke saath
                const newQuantity = cart.items[itemIndex].quantity + quantity;
                if (product.stock < newQuantity) {
                    throw new AppError(400, `Only ${product.stock} items available in stock`);
                }
                cart.items[itemIndex].quantity = newQuantity;
            } else {
                cart.items.push({ product: productId, quantity });
            }

            // ✅ totalPrice fresh calculate karo
            cart.totalPrice = await calculateTotalPrice(cart.items);
            await cart.save();
        }

        return res.status(200).json({
            success: true,
            message: "Product added to cart successfully",
            cart,
        });
    } catch (err) {
        console.log("add to cart error:", err);
        next(err);
    }
};

const getCart = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const cart = await cartModel.findOne({ user: userId }).populate("items.product");

        if (!cart) {
            return res.status(200).json({
                success: true,
                message: "Cart is empty",
                cart: null,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Cart fetched successfully",
            cart,
            cartCount: cart.items.reduce((count, item) => count + item.quantity, 0),
        });
    } catch (err) {
        next(err);
    }
};

const removeFromCart = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const  productId  = req.params.productId;

        const cart = await cartModel.findOne({ user: userId });
        if (!cart) {
            throw new AppError(404, "Cart not found");
        }
 
        const itemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId
        );
        if (itemIndex === -1) {
            throw new AppError(404, "Product not found in cart");
        }

        cart.items.splice(itemIndex, 1);

        // ✅ Fresh recalculate karo
        cart.totalPrice = await calculateTotalPrice(cart.items);
        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Product removed from cart successfully",
            cart,
        });
    } catch (err) {
        console.log(err)
        next(err);
    }
};

// ✅ Naya - quantity update karo
const updateCartItem = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const productId = req.params.productId;
        const { quantity } = req.body;

        if (!productId || !quantity || quantity < 1) {
            throw new AppError(400, "Valid product ID and quantity required");
        }

        const product = await productModel.findById(productId);
        if (!product) {
            throw new AppError(404, "Product not found");
        }
        if (product.stock < quantity) {
            throw new AppError(400, `Only ${product.stock} items available in stock`);
        }

        const cart = await cartModel.findOne({ user: userId });
        if (!cart) {
            throw new AppError(404, "Cart not found");
        }

        const itemIndex = cart.items.findIndex(
            (item) => item.product.toString() === productId
        );
        if (itemIndex === -1) {
            throw new AppError(404, "Product not found in cart");
        }

        cart.items[itemIndex].quantity = quantity; // ✅ quantity set karo
        cart.totalPrice = await calculateTotalPrice(cart.items);
        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            cart,
        });
    } catch (err) {
        next(err);
    }
};

// ✅ Naya - order place hone ke baad cart clear karo
const clearCart = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const cart = await cartModel.findOne({ user: userId });
        if (!cart) {
            throw new AppError(404, "Cart not found");
        }

        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Cart cleared successfully",
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { addToCart, getCart, removeFromCart, updateCartItem, clearCart };