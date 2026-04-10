import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import reviewService from "../../services/review.service";

let initialState = {
  reviews: [],
  review: null,
  reviewLoading: false,
  error: null,
};

export const createReviewSlice = createAsyncThunk(
  "review/create",
  async ({ productId, reviewData }, thunkAPI) => {
    try {
      const response = await reviewService.createReviewService(productId, reviewData);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to create review");
    }
  }
);

export const getReviewSlice = createAsyncThunk(
  "review/get",
  async (productId, thunkAPI) => {
    try {
      const response = await reviewService.getReviewService(productId);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to get review");
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    clearReviewError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReviewSlice.pending, (state) => {
        state.reviewLoading = true;
        state.error = null;
      })
      .addCase(createReviewSlice.fulfilled, (state, action) => {
        state.reviewLoading = false;
        state.reviews.push(action.payload.data); // Naya review reviews array mein add karna
      })
      .addCase(createReviewSlice.rejected, (state, action) => {
        state.reviewLoading = false;
        state.error = action.payload || "Failed to create review";
      })
      .addCase(getReviewSlice.pending, (state) => {
        state.reviewLoading = true;
        state.error = null;
      })
      .addCase(getReviewSlice.fulfilled, (state, action) => {
        state.reviewLoading = false;
        state.reviews = action.payload.data; // Reviews ko update karna
      })
      .addCase(getReviewSlice.rejected, (state, action) => {
        state.reviewLoading = false;
        state.error = action.payload || "Failed to get reviews";
      });
  },
})

export const { clearReviewError } = reviewSlice.actions;
export default reviewSlice.reducer;