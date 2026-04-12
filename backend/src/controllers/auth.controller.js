const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/ApiError.utils");
const redisClient = require("../config/cache");
const { uploadImage } = require("../services/imagekit.service");

const register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const file = req.file;

        if (!name || !email || !password) {
            throw new AppError(400, "Name, email and password are required");
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            throw new AppError(400, "Email already in use");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

         let imageData = null;

        if (file) {
            imageData = await uploadImage(file);
        }

        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
            profileImage: imageData?.url,
            role
        });

        const token = jwt.sign({
            userId: user._id,
            email: user.email,
            role: user.role,
        }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profileImage: user.profileImage,
                role: user.role,
            },
            token
        });

    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            throw new AppError(400, "All Fields are require")
        }
        const user = await userModel.findOne({ email }).select("+password")

        if (!user) {
            throw new AppError(404, "Invalid Credentials")
        }

        const comparePassword = await bcrypt.compare(password, user.password)

        if (!comparePassword) {
            throw new AppError(400, "Invalid Credentials")
        }

        const token = jwt.sign({
            userId: user._id,
            email: user.email,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: "1d" })
 
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        })

        return res.status(200).json({
            success: true,
            message: "User Login Successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profileImage: user.profileImage,
                role: user.role,
            }
        })

    } catch (err) {
        next(err)
    }
}

const getMe = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user.userId)
        if (!user) {
            throw new AppError(404, "User not found")
        }
        return res.status(200).json({
            success: true,
            user: {
                id: user.userId,
                name: user.name,
                email: user.email,
                profileImage: user.profileImage,
                role: user.role,
            }
        })
    } catch (err) {
        next(err)
    }
}

const logout = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        await redisClient.set(`blacklist_${token}`, 
            "true", "EX", 24 * 60 * 60)
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        })

        return res.status(200).json({
            success: true,
            message: "User Logout Successfully"
        })
    }catch(err) {
        console.log(err)

        next(err)
    }
}

const getAllUsers = async (req, res, next) => {
    const users = await userModel.find()
    if(users.length <= 0) {
        return res.status(200).json({
            success: true,
            message: "No users found",
            users: []
        })
    }
    return res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        users: users,
        totalUsers: users.length-1
    })

}

module.exports = {
    register,
    login,
    getMe,
    logout,
    getAllUsers
}