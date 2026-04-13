import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import addressService from "../../services/address.service"

const initialState = {
  addresses: [],
  address: null,
  selectedAddressId: null, // Track selected address for checkout
  addressLoading: false,
  error: null
}
export const addAddressSlice = createAsyncThunk(
  "address/add",
  async (addressData, thunkAPI) => {
    try {
      const response = await addressService.addAddressService(addressData)
    return response
    }catch(err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "something went wrong")
    }
  }
)

export const getAddressSlice = createAsyncThunk(
  "address/get",
  async (_, thunkAPI) => {
    try {
      const response = await addressService.fetchAddressService()
    return response
    }catch(err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "something went wrong")
    }
  }
)

export const updateAddressSlice = createAsyncThunk(
  "address/update",
  async ({id, addressData}, thunkAPI) => {
    try {
      const response = await addressService.updateAddressService({id, addressData})
    return response
    }catch(err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "something went wrong")
    }
  }
)

export const deleteAddressSlice = createAsyncThunk(
  "address/delete",
  async (id, thunkAPI) => {
    try {
      const response = await addressService.deleteAddressService(id)
    return response
    }catch(err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "something went wrong")
    }
  }
)

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    clearAddressError: (state) => {
      state.error = null
    },
    selectAddress: (state, action) => {
      state.selectedAddressId = action.payload
    }
  },
  extraReducers: (builder) => {
    builder

    //addAddress
    .addCase(addAddressSlice.pending, (state) => {
      state.addressLoading = true
      state.error = null
    })
    .addCase(addAddressSlice.fulfilled, (state, action) => {
      state.addressLoading = false
      const newAddr = action.payload.data || action.payload
      state.address = newAddr
      state.addresses.push(newAddr)
      state.selectedAddressId = newAddr._id
    })
    .addCase(addAddressSlice.rejected, (state, action) => {
      state.addressLoading = false
      state.error = action.payload
    })

    //getAddressSlice
    .addCase(getAddressSlice.pending, (state) => {
      state.addressLoading = true
      state.error = null
    })
    .addCase(getAddressSlice.fulfilled, (state, action) => {
      state.addressLoading = false
      state.addresses = action.payload.data || action.payload || []
      if (state.addresses.length > 0 && !state.selectedAddressId) {
        state.selectedAddressId = state.addresses[0]._id
      }
    })
    .addCase(getAddressSlice.rejected, (state, action) => {
      state.addressLoading = false
      state.error = action.payload
    })

     //updateAddressSlice
    .addCase(updateAddressSlice.pending, (state) => {
      state.addressLoading = true
      state.error = null
    })
    .addCase(updateAddressSlice.fulfilled, (state, action) => {
      state.addressLoading = false
      const updated = action.payload.data || action.payload
      state.address = updated
      state.addresses = state.addresses.map(a => a._id === updated._id ? updated : a)
    })
    .addCase(updateAddressSlice.rejected, (state, action) => {
      state.addressLoading = false
      state.error = action.payload
    })

     //deleteAddressSlice
    .addCase(deleteAddressSlice.pending, (state) => {
      state.addressLoading = true
      state.error = null
    })
    .addCase(deleteAddressSlice.fulfilled, (state, action) => {
      state.addressLoading = false
      const deletedId = action.meta.arg
      state.addresses = state.addresses.filter((a) => a._id !== deletedId);
      if (state.selectedAddressId === deletedId) {
        state.selectedAddressId = state.addresses[0]?._id || null
      }
    })
    .addCase(deleteAddressSlice.rejected, (state, action) => {
      state.addressLoading = false
      state.error = action.payload
    })
  }
})

export const {clearAddressError, selectAddress} = addressSlice.actions
export default addressSlice.reducer