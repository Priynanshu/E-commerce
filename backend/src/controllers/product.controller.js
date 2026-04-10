const productModel = require("../models/product.model")
const AppError = require("../utils/ApiError.utils")


const createProduct = async (req, res, next) => {
    try {
        const {name, description, category, stock, price, images} = req.body

        if(!name || !description || !category || !stock || !price) {
            throw new AppError(400, "All fields are required")
        }

        const product = await productModel.create({
            name,
            description,
            category,
            stock,
            price,
            images: images || [],
        })

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        })

    }catch(err) {
        console.log(err)
        next(err)
    }
}

const getProducts = async (req, res, next) => {
    try {
       const products = await productModel.find().sort({ createdAt: -1 }).populate({
        path: "reviews",
        populate: { path: "user", select: "name" }
       })

       if(!products) {
        throw new AppError(404, "Products not found")
       }

       if(products.length === 0) {
        return res.status(200).json({
            success: true,
            message: "No products found"
        })
       }

       return res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        count: products.length,
        products
       })
    }catch(err) {
        next(err)
    }
}

const getProductById = async (req, res, next) => {
    try {
        const productId = req.params.id
       const product = await productModel.findById(productId).populate({
        path: "reviews",
        populate: { path: "user", select: "name" }
       })

       if(!product) {
        throw new AppError(404, "Products not found")
       }

       return res.status(200).json({
        success: true,
        message: "Product fetched successfully",
        product
       })
    }catch(err) {
        next(err)
    }
}

const updateProducts = async (req, res, next) => {
    try {
        const {id} = req.params
        const {name, description, category, stock, price, images} = req.body
        const product = await productModel.findByIdAndUpdate(id, {
            name,
            description,
            category,
            stock,
            price,
            images: images || [],
        }, { new: true })

        if(!product) {
            throw new AppError(404, "Product not found")
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product
        })
    }catch(err) {
        next(err)
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const {id} = req.params
        const product = await productModel.findByIdAndDelete(id)    
        if(!product) {
            throw new AppError(404, "Product not found")
        }
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        })
    }catch(err) {
        next(err)
    }
}

module.exports = {createProduct, getProducts, getProductById, updateProducts, deleteProduct}