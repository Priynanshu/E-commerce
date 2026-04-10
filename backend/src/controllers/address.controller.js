const addressModel = require("../models/address.model");
const AppError = require("../utils/ApiError.utils");

const createAddress = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { street, city, state, pinCode, phone } = req.body;
        if (!street || !city || !state || !pinCode || !phone) {
            throw new AppError(400, "All fields are required");
        }
        const address = await addressModel.create({
            user: userId,
            street,
            city,
            state,
            pinCode,
            phone
        });
        return res.status(201).json({
            success: true,
            message: "Address created successfully",
            data: address
        });
    } catch (err) {
        console.log(err);
        next(err);
    }
};

const getAddresses = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const addresses = await addressModel.find({ user: userId });
        return res.status(200).json({
            success: true,
            message: "Addresses fetched successfully",
            data: addresses
        });
    } catch (err) {
        next(err);
    }
};

const updateAddress = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const addressId = req.params.id;
        
        const { street, city, state, pinCode, phone } = req.body;
        const address = await addressModel.findOne({ _id: addressId, user: userId });

        if (!address) {
            throw new AppError(404, "Address not found");
        }

        address.street = street || address.street;
        address.city = city || address.city;
        address.state = state || address.state;
        address.pinCode = pinCode || address.pinCode;
        address.phone = phone || address.phone;
        await address.save();

        return res.status(200).json({
            success: true,
            message: "Address updated successfully",
            data: address
        });
    } catch (err) {
        next(err);
    }
};

const deleteAddress = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const addressId  = req.params.id;
        const address = await addressModel.findOneAndDelete({ _id: addressId, user: userId });

        if (!address) {
            throw new AppError(404, "Address not found");
        }

        return res.status(200).json({
            success: true,
            message: "Address deleted successfully",
            data: address
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createAddress,
    getAddresses,
    updateAddress,
    deleteAddress
};
