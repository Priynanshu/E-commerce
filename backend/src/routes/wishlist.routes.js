const express = require('express');
const wishlistController = require("../controllers/wishlist.controller");
const authMiddleware = require("../middlewares/auth.middleware")
const cacheMiddleware = require("../middlewares/cache.middleware");
const { wishlistKey } = require('../utils/cacheKey.utils');

const router = express.Router();

router.post("/add-wishlist/:productId", authMiddleware.identifyUser, wishlistController.addToWishlist);
router.get("/get-wishlist", cacheMiddleware(wishlistKey, 120), authMiddleware.identifyUser, wishlistController.getWishlist);
router.delete("/remove-from-wishlist/:productId", authMiddleware.identifyUser, wishlistController.removeFromWishlist);

module.exports = router;