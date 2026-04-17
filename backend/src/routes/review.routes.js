const express = require('express');
const reviewController = require("../controllers/review.controller");
const authMiddleware = require("../middlewares/auth.middleware")
const cacheMiddleware = require("../middlewares/cache.middleware");
const { productReviewKey } = require('../utils/cacheKey.utils');

const router = express.Router();

router.post("/create/:productId", authMiddleware.identifyUser, reviewController.createReview);
router.get("/product/:productId", cacheMiddleware(productReviewKey, 120),  authMiddleware.identifyUser, reviewController.getReviews);

module.exports = router;