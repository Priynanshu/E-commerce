import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "../../services/product.service";

let initialState = {
  products: [],
  product: null,
  productLoading: false,
  error: null,
};

// --- Thunks ---

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await productService.fetchAllProductsService();
      // Note: Agar service return response.data kar rahi hai toh seedha return response
      return response.data || response; 
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Something went wrong");
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id, thunkAPI) => {
    try {
      const response = await productService.fetchProductByIdService(id);
      return response.data || response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Product not found");
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/create",
  async (productData, thunkAPI) => {
    try {
      const response = await productService.createProductService(productData);
      return response.data || response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to create product");
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, productData }, thunkAPI) => {
    try {
      const response = await productService.updateProductService({ id, productData });
      return response.data || response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, thunkAPI) => {
    try {
      const response = await productService.deleteProductService(id);
      return { id, message: response.data?.message }; // ID return kar rahe hain filter ke liye
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

// --- Slice ---

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProductError: (state) => {
      state.error = null;
    },
    resetProductState: (state) => {
      state.product = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // 1. Fetch All Products
      .addCase(fetchAllProducts.pending, (state) => {
        state.productLoading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.productLoading = false;
        // Backend se agar { products: [] } aa raha hai toh action.payload.products
        state.products = action.payload.products || action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.productLoading = false;
        state.error = action.payload;
      })

      // 2. Fetch Product By ID
      .addCase(fetchProductById.pending, (state) => {
        state.productLoading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.productLoading = false;
        state.product = action.payload.product || action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.productLoading = false;
        state.error = action.payload;
      })

      // 3. Create Product
      .addCase(createProduct.fulfilled, (state, action) => {
        state.productLoading = false;
        // Naya product array mein add kar do taaki page refresh na karna pade
        const newProduct = action.payload.product || action.payload;
        state.products.unshift(newProduct); 
      })

      // 4. Update Product
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.productLoading = false;
        const updatedProduct = action.payload.product || action.payload;
        state.products = state.products.map((p) => 
          p._id === updatedProduct._id ? updatedProduct : p
        );
      })

      // 5. Delete Product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.productLoading = false;
        // State se product remove kar do
        state.products = state.products.filter((p) => p._id !== action.payload.id);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearProductError, resetProductState } = productSlice.actions;
export default productSlice.reducer;