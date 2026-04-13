import { useDispatch, useSelector } from "react-redux"
import { useCallback } from "react"
import { createPaymentSlice, processPaymentSlice, resetPayment, setPaymentMethod, clearPaymentError } from "../features/payment/paymentSlice"

const usePayment = () => {
    const dispatch = useDispatch()
    const { selectedMethod, status, paymentLoading, transactionId, error, currentPayment } = useSelector((s) => s.payment)

    const setPaymentMethodHook = useCallback((method) => {
        dispatch(setPaymentMethod(method))
    }, [dispatch])

    const createPaymentHook = useCallback(async (orderId, method) => {
        try {
            return await dispatch(createPaymentSlice({ orderId, paymentMethod: method })).unwrap()
        } catch (err) {
            throw err
        }
    }, [dispatch])

    const processPaymentHook = useCallback(async (paymentId, simulateSuccess = true) => {
        try {
            return await dispatch(processPaymentSlice({ paymentId, simulateSuccess })).unwrap()
        } catch (err) {
            throw err
        }
    }, [dispatch])

    const resetPaymentHook = useCallback(() => {
        dispatch(resetPayment())
    }, [dispatch])

    const clearPaymentErrorHook = useCallback(() => {
        dispatch(clearPaymentError())
    }, [dispatch])

    return {
        selectedMethod,
        status,
        paymentLoading,
        transactionId,
        error,
        currentPayment,
        setPaymentMethodHook,
        createPaymentHook,
        processPaymentHook,
        resetPaymentHook,
        clearPaymentErrorHook
    }
}

export default usePayment
