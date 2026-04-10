const express = require("express");
const productController = require("../controllers/product.controller");
const authMiddleware = require("../middlewares/auth.middleware")

const router = express.Router();

router.post("/create", authMiddleware.identifyUser, authMiddleware.isAdmin, productController.createProduct)
router.get("/all", authMiddleware.identifyUser, productController.getProducts)
router.get("/get/:id", authMiddleware.identifyUser, productController.getProductById)
router.put("/update/:id", authMiddleware.identifyUser, authMiddleware.isAdmin, productController.updateProducts)
router.delete("/delete/:id", authMiddleware.identifyUser, authMiddleware.isAdmin, productController.deleteProduct)
  
module.exports = router;  