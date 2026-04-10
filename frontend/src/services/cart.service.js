import api from "./api.service"

const addToCartService = async (productId, quantity) => {
    try {
        console.log("Adding to cart:", { productId, quantity })
        const response = await api.post("/cart/add", { productId, quantity })
        return response.data
    } catch (error) {
        console.error("Error adding to cart:", error)
        throw error
    }
}

const getCartService = async () => {
    try {
        const response = await api.get("/cart/get")
        return response.data
    } catch (error) {
        console.error("Error fetching cart:", error)
        throw error
    }
}

const removeFromCartService = async (productId) => {
    try {
        const response = await api.delete(`/cart/remove/${productId}`)
        return response.data
    } catch (error) {
        console.error("Error removing from cart:", error)
        throw error
    }
}

const updateCartItemService = async (productId, quantity) => {
    try {
        const response = await api.patch(`/cart/update/${productId}`, { quantity })
        return response.data
    } catch (error) {
        console.error("Error updating cart item:", error)
        throw error
    }
}

const clearCartService = async () => {
    try {
        const response = await api.delete("/cart/clear")
        return response.data
    } catch (error) {
        console.error("Error clearing cart:", error)
        throw error
    }
}

const cartService = {
    addToCartService,
    getCartService,
    removeFromCartService,
    updateCartItemService,
    clearCartService
}

export default cartService
