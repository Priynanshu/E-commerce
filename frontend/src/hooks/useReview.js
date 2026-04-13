import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearReviewError, createReviewSlice, getReviewSlice } from "../features/review/reviewSlice"

const useReview = () => {
    const dispatch = useDispatch()
    const { reviews, reviewLoading, error } = useSelector((state) => state.review)

    const createReviewHook = useCallback(async (productId, reviewData) => {
        try {
            return await dispatch(createReviewSlice({ productId, reviewData }))
        } catch (err) {
            throw err
        }
    }, [dispatch])

    const getReviewHook = useCallback(async (productId) => {
        await dispatch(getReviewSlice(productId));
    }, [dispatch]);

    // Clear errors on unmount or on initial load
    useEffect(() => {
        dispatch(clearReviewError())
    }, [dispatch])

    return {
        createReviewHook,
        getReviewHook,
        reviews,
        reviewLoading,
        error
    }
}

export default useReview