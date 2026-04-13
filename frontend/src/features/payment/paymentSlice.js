import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import paymentService from "../../services/payment.service";

export const createPaymentSlice = createAsyncThunk(
    "payment/create",
    async (paymentData, { rejectWithValue }) => {
        try {
            return await paymentService.createPaymentService(paymentData);
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Payment creation failed");
        }
    }
);

export const processPaymentSlice = createAsyncThunk(
    "payment/process",
    async ({ paymentId, simulateSuccess }, { rejectWithValue }) => {
        try {
            return await paymentService.processPaymentService(paymentId, simulateSuccess);
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Payment processing failed");
        }
    }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    selectedMethod: "cod",
    paymentLoading: false,
    status: "idle", // idle | pending | completed | failed
    transactionId: null,
    error: null,
    currentPayment: null
  },
  reducers: {
    setPaymentMethod: (state, action) => {
      state.selectedMethod = action.payload;
    },
    resetPayment: (state) => {
      state.status = "idle";
      state.transactionId = null;
      state.error = null;
      state.currentPayment = null;
      state.paymentLoading = false;
    },
    clearPaymentError: (state) => {
        state.error = null;
    }
  },
  extraReducers: (builder) => {
      builder
        .addCase(createPaymentSlice.pending, (state) => {
            state.paymentLoading = true;
            state.error = null;
        })
        .addCase(createPaymentSlice.fulfilled, (state, action) => {
            state.paymentLoading = false;
            state.currentPayment = action.payload.data;
            state.status = "pending";
        })
        .addCase(createPaymentSlice.rejected, (state, action) => {
            state.paymentLoading = false;
            state.error = action.payload;
        })
        .addCase(processPaymentSlice.pending, (state) => {
            state.paymentLoading = true;
        })
        .addCase(processPaymentSlice.fulfilled, (state, action) => {
            state.paymentLoading = false;
            state.status = action.payload.success ? "completed" : "failed";
            state.transactionId = action.payload.data?._id;
        })
        .addCase(processPaymentSlice.rejected, (state, action) => {
            state.paymentLoading = false;
            state.error = action.payload;
            state.status = "failed";
        });
  }
});

export const { setPaymentMethod, resetPayment, clearPaymentError } =
  paymentSlice.actions;
export default paymentSlice.reducer;
