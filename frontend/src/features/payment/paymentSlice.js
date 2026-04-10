import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    selectedMethod: "card",
    status: "idle", // idle | pending | completed | failed
    transactionId: null,
  },
  reducers: {
    setPaymentMethod: (state, action) => {
      state.selectedMethod = action.payload;
    },
    paymentSuccess: (state, action) => {
      state.status = "completed";
      state.transactionId = action.payload;
    },
    paymentFailed: (state) => {
      state.status = "failed";
    },
    resetPayment: (state) => {
      state.status = "idle";
      state.transactionId = null;
    },
  },
});

export const { setPaymentMethod, paymentSuccess, paymentFailed, resetPayment } =
  paymentSlice.actions;
export default paymentSlice.reducer;
