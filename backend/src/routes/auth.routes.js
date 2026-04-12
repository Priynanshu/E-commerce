const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const authController = require("../controllers/auth.controller")
const upload = require("../middlewares/file.middleware")

const router = express.Router()

router.post("/register", upload.single("profileImage"), authController.register)
router.post("/login", authMiddleware.loginRateLimiter, authController.login)
router.get("/me", authMiddleware.identifyUser, authController.getMe)
router.post("/logout", authMiddleware.identifyUser, authController.logout)
router.get("/users", authMiddleware.identifyUser, authMiddleware.isAdmin, authController.getAllUsers)

module.exports = router