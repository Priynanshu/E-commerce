const redis = require("../config/cache");

const clearProductCache = async (productId) => {
    // single product
    await redis.del(`product:${productId}`);

    // list cache
    const keys = await redis.keys("products:*");
    if (keys.length > 0) {
        await redis.del(keys);
    }
};

const clearWishlistCache = async (productId) => {
    await redis.del(`product:${productId}`)

    const keys = await redis.keys("products:*")
    if(keys.length > 0) {
        await redis.del(keys)
    }
}

module.exports = { clearProductCache, clearWishlistCache };