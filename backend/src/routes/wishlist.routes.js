const express = require('express');
const wishlistController = require("../controllers/wishlist.controller");
const authMiddleware = require("../middlewares/auth.middleware")

const router = express.Router();

router.post("/add-wishlist/:productId", authMiddleware.identifyUser, wishlistController.addToWishlist);
router.get("/get-wishlist", authMiddleware.identifyUser, wishlistController.getWishlist);
router.delete("/remove-from-wishlist/:productId", authMiddleware.identifyUser, wishlistController.removeFromWishlist);

module.exports = router;