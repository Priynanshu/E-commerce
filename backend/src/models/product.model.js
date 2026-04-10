const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    index: true,
  },
  images: [
    {
      type: String,
    },
  ], 
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  reviews: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }]
}, { timestamps: true });

productSchema.index({name: "text", category: "text" });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;