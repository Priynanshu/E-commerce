const jwt = require("jsonwebtoken");
const AppError = require("../utils/ApiError.utils");
const redisClient = require("../config/cache");
const rateLimit = require("express-rate-limit");

const identifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new AppError(401, "Authentication token is missing");
        }
        // Check if token is blacklisted
        const isBlacklisted = await redisClient.get(`blacklist_${token}`);
        if (isBlacklisted) {
            throw new AppError(401, "Token is blacklisted. Please log in again.");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        console.log(err)
        if (err.name === "JsonWebTokenError") {
            return next(new AppError(401, "Invalid token. Please log in again."));
        }
        if (err.name === "TokenExpiredError") {
            return next(new AppError(401, "Token has expired. Please log in again."));
        }
        next(err);
    }
};

const isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
            throw new AppError(403, "Access denied. Admins only.");
        }
        next();
    }catch(err) {
        console.log(err)
        next(err)
    }
};

const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 login attempts per windowMs
    message: "Too many login attempts from this IP, please try again after 15 minutes"
});

module.exports = {identifyUser, isAdmin, loginRateLimiter};