const express = require('express');
const reviewController = require("../controllers/review.controller");
const authMiddleware = require("../middlewares/auth.middleware")

const router = express.Router();

router.post("/create/:productId", authMiddleware.identifyUser, reviewController.createReview);
router.get("/product/:productId", authMiddleware.identifyUser, reviewController.getReviews);

module.exports = router;