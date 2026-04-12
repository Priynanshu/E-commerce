import { useDispatch, useSelector } from "react-redux"
import { cancleOrderSlice, clearOrderError, createOrderSlice, fetchAllOrdersSlice, fetchMyOrdersSlice, fetchOrderByIdSlice } from "../features/order/orderSlice"
import { updateCartItemSlice } from "../features/cart/cartSlice"
import { useEffect } from "react"

const useOrder = () => {
    const dispatch = useDispatch()
    const {order, orders, totalOrders, totalRevenue, orderLoading, error} = useSelector((state) => state.order)

    const createOrderHook = async (orderData) => {
        try {
           return await dispatch(createOrderSlice(orderData))
        }catch(err) {
            throw err
        }
    }

    const fetchAllOrdersHook = async () => {
        try {
            return await dispatch(fetchAllOrdersSlice())
        } catch(err) {
            throw err
        }
    }

    const fetchOrderByIdHook = async (id) => {
        try {
            return await dispatch(fetchOrderByIdSlice(id))
        }catch(err) {
            throw err
        }
    }

    const fetchMyOrdersHook = async () => {
        try {
            return await dispatch(fetchMyOrdersSlice())
        }catch(err) {
            throw err
        }
    }

    const cancelOrderHook = async (id) => {
        try {
            return await dispatch(cancleOrderSlice(id))
        }catch(err) {
            throw err
        }
    }

    const updateOrderStatusHook = async (id, status) => {
        try {
            return await dispatch(updateCartItemSlice({id, status}))
        }catch(err) {
            throw err
        }
    }

    useEffect(() => {
        dispatch(clearOrderError())
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