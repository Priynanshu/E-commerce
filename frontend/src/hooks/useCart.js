import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCartSlice, clearCartError, clearCartSlice, getCartSlice, removeFromCartSlice, updateCartItemSlice } from "../features/cart/cartSlice";

const useCart = () => {
    const dispatch = useDispatch();
    const { cartItems, cartCount, loading, error, totalPrice } = useSelector((state) => state.cart);

    const addToCartHook = async (productId, quantity) => {
        try {
            return await dispatch(addToCartSlice({ productId, quantity }));
        } catch (err) {
            throw err;
        }
    };

    const removeFromCartHook = async (productId) => {
        try {
            return await dispatch(removeFromCartSlice(productId));
        } catch (err) {
            throw err;
        }
    };

    const updateCartItemHook = async (productId, quantity) => {
        try {
            return await dispatch(updateCartItemSlice({ productId, quantity }));
        } catch (err) {
            throw err;
        }
    };

    const clearCartHook = async () => {
        try {
            return await dispatch(clearCartSlice());
        } catch (err) {
            throw err;
        }
    };

    const getCartHook = async () => {
        try {
            await dispatch(getCartSlice());
        } catch (err) {
            throw err;
        }
    };

    useEffect(() => {
        clearCartError();
    }, [dispatch]);

    return {
        cartItems,
        cartCount,
        totalPrice,
        loading,
        error,
        addToCartHook,
        removeFromCartHook,
        updateCartItemHook,
        clearCartHook,
        getCartHook
    }
}

export default useCart