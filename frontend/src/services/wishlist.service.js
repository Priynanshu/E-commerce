import api from "./api.service";

const addToWishlist = async (productId) => {
    try {
        const response = await api.post(`/wishlist/add-wishlist/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Error adding to wishlist:", error);
        throw error;
    }
};

const removeFromWishlist = async (productId) => {
    try {
        const response = await api.delete(`/wishlist/remove-from-wishlist/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Error removing from wishlist:", error);
        throw error;
    }
};

const getWishlist = async () => {
    try {
        const response = await api.get("/wishlist/get-wishlist");
        return response.data;
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        throw error;
    }
};

const wishlistService = {
    addToWishlist,
    removeFromWishlist,
    getWishlist
};

export default wishlistService;