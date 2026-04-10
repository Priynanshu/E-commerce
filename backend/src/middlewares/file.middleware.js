// middleware/multer.js
const multer = require("multer");

// memory storage (ImageKit / Cloud upload ke liye best)
const storage = multer.memoryStorage();

// file filter (sirf image allow karega)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"), false);
    }
};

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter,
});

module.exports = upload;