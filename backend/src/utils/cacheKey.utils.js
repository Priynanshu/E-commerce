const productListKey = (req) => {
    const { search = "all", category = "all", sort = "default", page = 1 } = req.query;

    return `products:${search}:${category}:${sort}:page:${page}`;
};

const productDetailKey = (req) => {
    return `product:${req.params.productId}`;
};

const productReviewKey = (req) => {
    return `product:${req.params.productId}`
}

const wishlistKey = (req) => {
    return `product:${req.params.productId}`
} 

module.exports = { productListKey, productDetailKey, productReviewKey, wishlistKey };