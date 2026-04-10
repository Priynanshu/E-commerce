const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    pinCode: {
        type: Number,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;