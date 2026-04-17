const express = require("express");
const productController = require("../controllers/product.controller");
const authMiddleware = require("../middlewares/auth.middleware")
const cacheMiddleware = require("../middlewares/cache.middleware");
const { productListKey, productDetailKey } = require("../utils/cacheKey.utils");

const router = express.Router();

router.post("/create", authMiddleware.identifyUser, authMiddleware.isAdmin, productController.createProduct)
router.get("/all", cacheMiddleware(productListKey, 60), productController.getProducts)
router.get("/get/:id", cacheMiddleware(productDetailKey, 60), productController.getProductById)
router.put("/update/:id", authMiddleware.identifyUser, authMiddleware.isAdmin, productController.updateProducts)
router.delete("/delete/:id", authMiddleware.identifyUser, authMiddleware.isAdmin, productController.deleteProduct)
  
module.exports = router;  