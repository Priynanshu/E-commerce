import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { 
    clearProductError, 
    createProduct, 
    deleteProduct, 
    fetchAllProducts, 
    updateProduct, 
    fetchProductById 
} from "../features/product/productSlice"
import { useEffect, useCallback } from "react"

const useProduct = (id = null) => { 
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { products, product, productLoading, error, totalProducts } = useSelector((state) => state.product)

    // 1. Fetch All Products
    const fetchAllProductsHook = useCallback(async (params = {}) => {
        dispatch(fetchAllProducts(params))
    }, [dispatch])

    // 2. Fetch Single Product
    const fetchProductByIdHook = useCallback(async (productId) => {
        if (productId) {
            dispatch(fetchProductById(productId))
        }
    }, [dispatch])

    // 3. Auto-fetch logic
    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id))
        }
    }, [id, dispatch])

    const createProductHook = useCallback(async (productData) => {
        try {
            return await dispatch(createProduct(productData)).unwrap()
        } catch (err) {
            throw err
        }
    }, [dispatch])

    const updateProductHook = useCallback(async (productId, productData) => {
        try {
            return await dispatch(updateProduct({ id: productId, productData })).unwrap()
        } catch (err) {
            throw err
        }
    }, [dispatch])

    const deleteProductHook = useCallback(async (productId) => {
        try {
            return await dispatch(deleteProduct(productId)).unwrap()
        } catch (err) {
            throw err
        }
    }, [dispatch])

    // Clear errors on unmount
    useEffect(() => {
        return () => {
            dispatch(clearProductError())
        }
    }, [dispatch])

    return {
        createProductHook,
        updateProductHook,
        deleteProductHook,
        fetchAllProductsHook,
        fetchProductByIdHook,
        products,
        product,
        totalProducts,
        productLoading,
        error
    }
}

export default useProduct