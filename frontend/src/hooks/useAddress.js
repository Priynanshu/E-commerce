import { useDispatch, useSelector } from "react-redux"
import { addAddressSlice, clearAddressError, deleteAddressSlice, getAddressSlice, updateAddressSlice } from "../features/address/addressSlice"
import { useEffect, useCallback } from "react"

const useAddress = () => {
    const dispatch = useDispatch()
    const {address, addresses, addressLoading, selectedAddressId, error} = useSelector((state) => state.address)

    const addAddressHook = useCallback(async (addressData) => {
        try {
            return await dispatch(addAddressSlice(addressData))
        }catch(err) {
            throw err
        }
    }, [dispatch])

    const fetchAddressHook = useCallback(async () => {
        try {
            return await dispatch(getAddressSlice())
        }catch(err) {
            throw err
        }
    }, [dispatch])

    const updateAddressHook = useCallback(async (id, addressData) => {
        try {
            return await dispatch(updateAddressSlice({id, addressData}))
        }catch(err) {
            throw err
        }
    }, [dispatch])

    const deleteAddressHook = useCallback(async (id) => {
        try {
            return await dispatch(deleteAddressSlice(id))
        }catch(err) {
            throw err
        }
    }, [dispatch])

    useEffect(() => {
        dispatch(clearAddressError())
    }, [dispatch])

    return {
        addAddressHook,
        fetchAddressHook,
        updateAddressHook,
        deleteAddressHook,
        address,
        addresses,
        addressLoading,
        selectedAddressId,
        error
    }
}

export default useAddress