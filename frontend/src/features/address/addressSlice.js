import { createSlice } from "@reduxjs/toolkit";
import { addresses } from "../../data/dummy";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    addresses,
    selectedAddressId: addresses[0]?._id || null,
  },
  reducers: {
    addAddress: (state, action) => {
      state.addresses.push(action.payload);
    },
    deleteAddress: (state, action) => {
      state.addresses = state.addresses.filter((a) => a._id !== action.payload);
    },
    selectAddress: (state, action) => {
      state.selectedAddressId = action.payload;
    },
  },
});

export const { addAddress, deleteAddress, selectAddress } = addressSlice.actions;
export default addressSlice.reducer;
