const express = require('express');
const paymentController = require("../controllers/payment.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/create", authMiddleware.identifyUser, paymentController.createPayment);
router.post("/process/:paymentId", authMiddleware.identifyUser, paymentController.processPayment);
router.get("/order/:orderId", authMiddleware.identifyUser, paymentController.getPaymentByOrderId);

module.exports = router;