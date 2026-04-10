import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import cartService from "../../services/cart.service"

let initialState = {
    cartItems: [],
    loading: false,
    totalPrice: 0,
    cartCount: 0,
    error: null,
}

export const addToCartSlice = createAsyncThunk(
    "cart/addToCart",
    async ({ productId, quantity }, thunkAPI) => {
        try {
            const response = await cartService.addToCartService(productId, quantity)
            return response.cart
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message || "Failed to add to cart")
        }
    }
)

export const getCartSlice = createAsyncThunk(
    "cart/getCart",
    async (_, thunkAPI) => {
        try {
            const response = await cartService.getCartService()
            return response.cart
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message || "Failed to fetch cart")
        }
    }
)

export const removeFromCartSlice = createAsyncThunk(
    "cart/removeFromCart",
    async (productId, thunkAPI) => {
        try {
            const response = await cartService.removeFromCartService(productId)
            return response.cart
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message || "Failed to remove from cart")
        }
    }
)

export const updateCartItemSlice = createAsyncThunk(
    "cart/updateCartItem",
    async ({ productId, quantity }, thunkAPI) => {
        try {
            const response = await cartService.updateCartItemService(productId, quantity)
            return response.cart
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message || "Failed to update cart item")
        }
    }
)

export const clearCartSlice = createAsyncThunk(
    "cart/clearCart",
    async (_, thunkAPI) => {
        try {
            const response = await cartService.clearCartService()
            return response.cart
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message || "Failed to clear cart")
        }
    }
)

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCartError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder

        .addCase(addToCartSlice.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(addToCartSlice.fulfilled, (state, action) => {
            state.loading = false
            state.cartItems = action.payload.items
            state.totalPrice = action.payload.totalPrice
            state.cartCount = action.payload.cartCount
        })
        .addCase(addToCartSlice.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || "Failed to add to cart"
        })

        .addCase(getCartSlice.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(getCartSlice.fulfilled, (state, action) => {
            state.loading = false
            state.cartItems = action.payload ? action.payload.items : []
             state.totalPrice = action.payload.totalPrice
             state.cartCount = action.payload.cartCount
        })
        .addCase(getCartSlice.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || "Failed to fetch cart"
        })

        .addCase(removeFromCartSlice.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(removeFromCartSlice.fulfilled, (state, action) => {
            state.loading = false
            state.cartItems = action.payload.items
            state.totalPrice = action.payload.totalPrice
            state.cartCount = action.payload.cartCount
        })
        .addCase(removeFromCartSlice.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || "Failed to remove from cart"
        })

        .addCase(updateCartItemSlice.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(updateCartItemSlice.fulfilled, (state, action) => {
            state.loading = false
            state.cartItems = action.payload.items
             state.totalPrice = action.payload.totalPrice
             state.cartCount = action.payload.cartCount
        })
        .addCase(updateCartItemSlice.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || "Failed to update cart item"
        })

        .addCase(clearCartSlice.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(clearCartSlice.fulfilled, (state) => {
            state.loading = false
            state.cartItems = []
            state.totalPrice = 0
            state.cartCount = 0
        })
        .addCase(clearCartSlice.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload || "Failed to clear cart"
        })
    }
})

export const { clearCartError } = cartSlice.actions
export default cartSlice.reducer