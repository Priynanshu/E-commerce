import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import wishlistService from "../../services/wishlist.service";

let initialState = {
  wishlistProducts: [],
  wishlistLoading: false,
  wishlistCount: 0,
  error: null,
};

export const addToWishlistSlice = createAsyncThunk(
  "wishlist/add",
  async (productId, thunkAPI) => {
    try {
      const response = await wishlistService.addToWishlist(productId);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to add to wishlist");
    }
  }
);

export const removeFromWishlistSlice = createAsyncThunk(
  "wishlist/remove",
  async (productId, thunkAPI) => {
    try {
      const response = await wishlistService.removeFromWishlist(productId);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to remove from wishlist");
    }
  }
);

export const getWishlistSlice = createAsyncThunk(
  "wishlist/get",
  async (_, thunkAPI) => {
    try {
      const response = await wishlistService.getWishlist();
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to get wishlist");
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearWishlistError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToWishlistSlice.pending, (state) => {
        state.wishlistLoading = true;
        state.error = null;
      })
      .addCase(addToWishlistSlice.fulfilled, (state, action) => {
        state.wishlistLoading = false;
  state.wishlistProducts = action.payload.data || [];
  state.wishlistCount = state.wishlistProducts.length;
      })
      .addCase(addToWishlistSlice.rejected, (state, action) => {
        state.wishlistLoading = false;
        state.error = action.payload || "Failed to add to wishlist";
      })
      .addCase(removeFromWishlistSlice.pending, (state) => {
        state.wishlistLoading = true;
        state.error = null;
      })
      .addCase(removeFromWishlistSlice.fulfilled, (state, action) => {
         state.wishlistLoading = false;
  state.wishlistProducts = action.payload.data || [];
  state.wishlistCount = state.wishlistProducts.length;
      })
      .addCase(removeFromWishlistSlice.rejected, (state, action) => {
        state.wishlistLoading = false;
        state.error = action.payload || "Failed to remove from wishlist";
      })
      .addCase(getWishlistSlice.pending, (state) => {
        state.wishlistLoading = true;
        state.error = null;
      })
      .addCase(getWishlistSlice.fulfilled, (state, action) => {
        state.wishlistLoading = false;
        state.wishlistLoading = false;
  state.wishlistProducts = action.payload.data || [];
  state.wishlistCount = action.payload.count || state.wishlistProducts.length; 
      })
      .addCase(getWishlistSlice.rejected, (state, action) => {
        state.wishlistLoading = false;
        state.error = action.payload || "Failed to get wishlist";
      });
  },
});

export const { clearWishlistError } = wishlistSlice.actions;
export default wishlistSlice.reducer;