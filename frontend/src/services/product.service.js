import api from "./api.service"

const fetchAllProductsService = async (params = {}) => {
    try {
        const response = await api.get("/products/all", { params });
        return response.data; // Thunk ko ab response.data.products milega
    } catch (err) {
        throw err;
    }
}

const fetchProductByIdService = async (id) => {
    try {
        // Path check karein: Kya ye /products/get/:id hai? 
        const response = await api.get(`/products/get/${id}`); 
        return response.data;
    } catch (err) {
        throw err;
    }
}

const createProductService = async (productData) => {
    try {
        // Agar image upload hai, toh ensure karein productData "FormData" object ho
        const response = await api.post("/products/create", productData);
        return response.data;
    } catch (err) {
        throw err;
    }
}

// FIX: Thunk se {id, productData} as an object aa raha hai
const updateProductService = async ({ id, productData }) => {
    try {
        // Backend usually PUT ya PATCH use karta hai updates ke liye
        // Lekin agar aapne POST rakha hai toh wahi rehne dein
        const response = await api.put(`/products/update/${id}`, productData);
        return response.data;
    } catch (err) {
        throw err;
    }
}

const deleteProductService = async (id) => {
    try {
        const response = await api.delete(`/products/delete/${id}`);
        return response.data;
    } catch (err) {
        throw err;
    }
}

const productService = {
    fetchAllProductsService,
    createProductService,
    updateProductService,
    deleteProductService,
    fetchProductByIdService
}

export default productService;