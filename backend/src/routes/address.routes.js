const express = require('express');
const addressController = require("../controllers/address.controller");
const authMiddleware = require("../middlewares/auth.middleware")

const router = express.Router();

router.post("/add", authMiddleware.identifyUser, addressController.createAddress);
router.get("/get", authMiddleware.identifyUser, addressController.getAddresses);
router.put("/update/:id", authMiddleware.identifyUser, addressController.updateAddress);
router.delete("/delete/:id", authMiddleware.identifyUser, addressController.deleteAddress);

module.exports = router;