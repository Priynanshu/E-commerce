const express = require('express');
const cartController = require("../controllers/cart.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/add", authMiddleware.identifyUser, cartController.addToCart);
router.get("/get", authMiddleware.identifyUser, cartController.getCart);
router.delete("/remove/:productId", authMiddleware.identifyUser, cartController.removeFromCart);
router.patch("/update/:productId", authMiddleware.identifyUser, cartController.updateCartItem);
router.delete("/clear", authMiddleware.identifyUser, cartController.clearCart);

module.exports = router;