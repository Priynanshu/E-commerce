import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCartSlice, clearCartError, clearCartSlice, getCartSlice, removeFromCartSlice, updateCartItemSlice } from "../features/cart/cartSlice";

const useCart = () => {
    const dispatch = useDispatch();
    const { cartItems, cartCount, loading, error, totalPrice } = useSelector((state) => state.cart);

    const addToCartHook = useCallback(async (productId, quantity = 1) => {
        try {
            const id = typeof productId === 'object' ? productId._id : productId;
            return await dispatch(addToCartSlice({ productId: id, quantity }));
        } catch (err) {
            throw err;
        }
    }, [dispatch]);

    const removeFromCartHook = useCallback(async (productId) => {
        try {
            return await dispatch(removeFromCartSlice(productId));
        } catch (err) {
            throw err;
        }
    }, [dispatch]);

    const updateCartItemHook = useCallback(async (productId, quantity) => {
        try {
            if (typeof productId === 'object' && !quantity) {
                 return await dispatch(updateCartItemSlice(productId));
            }
            return await dispatch(updateCartItemSlice({ productId, quantity }));
        } catch (err) {
            throw err;
        }
    }, [dispatch]);

    const clearCartHook = useCallback(async () => {
        try {
            return await dispatch(clearCartSlice());
        } catch (err) {
            throw err;
        }
    }, [dispatch]);

    const getCartHook = useCallback(async () => {
        try {
            await dispatch(getCartSlice());
        } catch (err) {
            throw err;
        }
    }, [dispatch]);

    useEffect(() => {
        dispatch(clearCartError());
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