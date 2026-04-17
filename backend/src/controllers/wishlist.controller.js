const productModel = require("../models/product.model");
const userModel = require("../models/user.model");
const wishlistModel = require("../models/wishlist.model");
const AppError = require("../utils/ApiError.utils");
const { clearWishlistCache } = require("../utils/cacheInvalidation.utils");

const addToWishlist = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const productId = req.params.productId;

        const product = await productModel.findById(productId);
        if (!product) {
            throw new AppError("Product not found", 404);
        }
        
        let wishlist = await wishlistModel.findOne({ user: userId });
         
        if (!wishlist) {
            wishlist = await wishlistModel.create({ user: userId, products: [productId] });
        } else {
            const productExists = wishlist.products.some(id => id.toString() === productId);
            if (productExists) {
                throw new AppError("Product already in wishlist", 400);
            }
            wishlist.products.push(productId);
            await wishlist.save();
        }

        // ✅ Save ke baad populate karo
        await wishlist.populate("products");
        
        return res.status(200).json({
            success: true,
            message: "Product added to wishlist",
            data: wishlist.products, 
            count: wishlist.products.length
        });
    } catch(err) {
        console.log(err)
        next(err);
    }
}

const getWishlist = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const wishlist = await wishlistModel.findOne({ user: userId }).populate("products");
        if (!wishlist) {
            return res.status(200).json({
                success: true,
                message: "Wishlist is empty",
                data: [],
            });
        }
        return res.status(200).json({
            success: true,
            message: "Wishlist fetched successfully",
            data:  [...wishlist.products],
            count: wishlist.products.length
        });
    }
    catch(err) {
        next(err);
    }
}

const removeFromWishlist = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { productId } = req.params;
        const wishlist = await wishlistModel.findOne({ user: userId });
        if (!wishlist) {
            throw new AppError("Wishlist not found", 404);
        }

        await clearWishlistCache(productId)
        
        const productIndex = wishlist.products.findIndex(id => id.toString() === productId);
        if (productIndex === -1) {
            throw new AppError("Product not in wishlist", 400);
        }
        wishlist.products.splice(productIndex, 1);
        await wishlist.save();
        await wishlist.populate("products"); 
        return res.status(200).json({
            success: true,
            message: "Product removed from wishlist",
            data: wishlist.products, 
            count: wishlist.products.length
        });
    } catch (err) {
        next(err);
    }
}
 
module.exports = {
    addToWishlist,
    getWishlist,
    removeFromWishlist
}
