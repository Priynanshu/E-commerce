import { useDispatch, useSelector } from "react-redux"
import { addAddressSlice, clearAddressError, deleteAddressSlice, getAddressSlice, updateAddressSlice } from "../features/address/addressSlice"
import { useEffect } from "react"

const useAddress = () => {
    const dispatch = useDispatch()
    const {address, addresses, addressLoading, error} = useSelector((state) => state.address)

    const addAddressHook = async (addressData) => {
        try {
            return await dispatch(addAddressSlice(addressData))
        }catch(err) {
            throw err
        }
    }

    const fetchAddressHook = async () => {
        try {
            return await dispatch(getAddressSlice())
        }catch(err) {
            throw err
        }
    }

    const updateAddressHook = async (id, addressData) => {
        try {
            return await dispatch(updateAddressSlice({id, addressData}))
        }catch(err) {
            throw err
        }
    }

    const deleteAddressHook = async (id) => {
        try {
            return await dispatch(deleteAddressSlice(id))
        }catch(err) {
            throw err
        }
    }

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
        error
    }
}

export default useAddress