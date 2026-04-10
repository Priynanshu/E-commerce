const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    },  
    password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    default: "https://ik.imagekit.io/a3d4qfkiw/insta-clone-posts/97e93701392a53ae68113b48e1a8956b.jpg?updatedAt=1772970994011",
  },
    role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;