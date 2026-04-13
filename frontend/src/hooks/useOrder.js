import { useDispatch, useSelector } from "react-redux"
import { 
    cancelOrderSlice, 
    clearOrderError, 
    createOrderSlice, 
    fetchAllOrdersSlice, 
    fetchMyOrdersSlice, 
    fetchOrderByIdSlice, 
    updateOrderStatusSlice 
} from "../features/order/orderSlice"
import { useEffect, useCallback } from "react"

const useOrder = () => {
    const dispatch = useDispatch()
    const {order, orders, totalOrders, totalRevenue, orderLoading, error} = useSelector((state) => state.order)

    const createOrderHook = useCallback(async (orderData) => {
        try {
           const result = await dispatch(createOrderSlice(orderData)).unwrap()
           return result
        }catch(err) {
            throw err
        }
    }, [dispatch])

    const fetchAllOrdersHook = useCallback(async () => {
        try {
            return await dispatch(fetchAllOrdersSlice()).unwrap()
        } catch(err) {
            throw err
        }
    }, [dispatch])

    const fetchOrderByIdHook = useCallback(async (id) => {
        try {
            return await dispatch(fetchOrderByIdSlice(id)).unwrap()
        }catch(err) {
            throw err
        }
    }, [dispatch])

    const fetchMyOrdersHook = useCallback(async () => {
        try {
            return await dispatch(fetchMyOrdersSlice()).unwrap()
        }catch(err) {
            throw err
        }
    }, [dispatch])

    const cancelOrderHook = useCallback(async (id) => {
        try {
            return await dispatch(cancelOrderSlice(id)).unwrap()
        }catch(err) {
            throw err
        }
    }, [dispatch])

    const updateOrderStatusHook = useCallback(async (orderId, status) => {
        try {
            return await dispatch(updateOrderStatusSlice({orderId, status})).unwrap()
        }catch(err) {
            throw err
        }
    }, [dispatch])

    useEffect(() => {
        return () => {
            dispatch(clearOrderError())
        }
    }, [dispatch])

    return {
        order, 
        orders, 
        totalOrders, 
        totalRevenue, 
        orderLoading,
        error,
        createOrderHook,
        fetchAllOrdersHook,
        fetchMyOrdersHook,
        fetchOrderByIdHook,
        cancelOrderHook,
        updateOrderStatusHook
    }
}

export default useOrder