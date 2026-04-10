const express = require('express');
const orderController = require("../controllers/order.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/create", authMiddleware.identifyUser, orderController.createOrder);
router.get("/my-orders", authMiddleware.identifyUser, orderController.getOrders);            // ✅ add kiya
router.get("/my-order/:id", authMiddleware.identifyUser, orderController.getOrderById);
router.get("/order-history", authMiddleware.identifyUser, orderController.getOrderHistory);
router.patch("/cancel/:id", authMiddleware.identifyUser, orderController.cancelOrder);       // ✅ delete → patch
router.get("/all", authMiddleware.identifyUser, authMiddleware.isAdmin, orderController.getAllOrders);
router.put("/update-status/:orderId", authMiddleware.identifyUser, authMiddleware.isAdmin, orderController.updateOrderStatus); // ✅ duplicate isAdmin hataya

module.exports = router;