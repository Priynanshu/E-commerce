import { useDispatch, useSelector } from "react-redux"
import { addToWishlistSlice, clearWishlistError, getWishlistSlice, removeFromWishlistSlice } from "../features/wishlist/wishlistSlice"
import { useCallback, useEffect } from "react"

const useWishlist = () => {
    const dispatch = useDispatch()
    const { wishlistProducts, wishlistLoading, error, wishlistCount } = useSelector((state) => state.wishlist)

    const addToWishlistHook = async (productId) => {
        try {
            return await dispatch(addToWishlistSlice(productId))
        } catch (err) {
            throw err
        }  
    }

    const removeFromWishlistHook = async (productId) => {
        try {
            return await dispatch(removeFromWishlistSlice(productId))
        } catch (err) {
            throw err
        }  
    }

    const getWishlistHook = useCallback(async () => {
            await dispatch(getWishlistSlice());
    }, [dispatch]);

   

    useEffect(() => {
        dispatch(clearWishlistError())
    }, [dispatch])

    return {
        addToWishlistHook,
        removeFromWishlistHook,
        getWishlistHook,
        wishlistProducts,
        wishlistCount,
        wishlistLoading,
        error
    }
}

export default useWishlist