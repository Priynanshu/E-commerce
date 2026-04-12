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
import { useEffect } from "react"

const useProduct = (id = null) => { // Optional ID parameter add kiya
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { products, product, productLoading, error, totalProducts } = useSelector((state) => state.product)

    // 1. Fetch All Products
    const fetchAllProductsHook = async () => {
        dispatch(fetchAllProducts())
    }

    // 2. Fetch Single Product (FIXED: Added 'id' in dispatch)
    const fetchProductByIdHook = async (productId) => {
        if (productId) {
            dispatch(fetchProductById(productId))
        }
    }

    // 3. Auto-fetch logic (Agar hook ko ID di jaye toh khud fetch kare)
    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id))
        }
    }, [id, dispatch])

    const createProductHook = async (productData) => {
        try {
            return await dispatch(createProduct(productData)).unwrap() // unwrap() better error handling ke liye
        } catch (err) {
            throw err
        }
    }

    const updateProductHook = async (id, productData) => {
        try {
            return await dispatch(updateProduct({ id, productData })).unwrap()
        } catch (err) {
            throw err
        }
    }

    const deleteProductHook = async (id) => {
        try {
            return await dispatch(deleteProduct(id)).unwrap()
        } catch (err) {
            throw err
        }
    }

    // Clear errors on unmount or on initial load
    useEffect(() => {
        dispatch(clearProductError())
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