const productModel = require("../models/product.model");
const reviewModel = require("../models/review.model");
const userModel = require("../models/user.model");
const AppError = require("../utils/ApiError.utils");

const createReview = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const userId = req.user.userId

        const { rating, comment } = req.body;

        const product = await productModel.findById(productId);
        if (!product) {
            throw new AppError("Product not found", 404);
        }
        const review = await reviewModel.create({
            product: productId,
            user: userId,
            rating,
            comment,
        });

        await productModel.findByIdAndUpdate(productId, {
        $push: { reviews: review._id }
        });

        return res.status(201).json({
            success: true,
            message: "Review created successfully",
            data: review,
        });
    }catch(err) {
        next(err);
    }
}

const getReviews = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const reviews = await reviewModel.find({ product: productId }).populate("user", "name profileImage");

        return res.status(200).json({
            success: true,
            message: "Reviews fetched successfully",
            data: reviews,
        });
    }catch(err) {
        next(err);
    }
}

module.exports = {
    createReview,
    getReviews
}