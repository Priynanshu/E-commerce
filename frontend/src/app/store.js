import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import productReducer from "../features/product/productSlice";
import orderReducer from "../features/order/orderSlice";
import addressReducer from "../features/address/addressSlice";
import paymentReducer from "../features/payment/paymentSlice";
import reviewReducer from "../features/review/reviewSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    product: productReducer,
    order: orderReducer,
    address: addressReducer,
    payment: paymentReducer,
    review: reviewReducer,
  },
});

export default store;
