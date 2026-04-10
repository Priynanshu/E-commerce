const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
   privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
   urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const uploadImage = async (file) => {
    try {
        const response = await imagekit.upload({
            file: file.buffer.toString("base64"), // multer buffer
            fileName: file.originalname,
            folder: "ecommerce", // optional
        });
 
        return {
            url: response.url,
            fileId: response.fileId,
        };
    } catch (error) {
        console.log("Error From Service: ", error)
        throw new Error("Image upload failed");
    }
};


module.exports = {uploadImage};