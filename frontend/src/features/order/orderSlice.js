import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import orderService from "../../services/order.service";

const initialState = {
  orders: [],
  order: null,
  totalOrders: 0,
  totalRevenue: 0,
  orderLoading: false,
  error: null,
};

export const fetchAllOrdersSlice  = createAsyncThunk(
  "orders/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await orderService.fetchAllOrdersService();
      return response
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Something went wrong");
    }
  }
);

export const fetchMyOrdersSlice  = createAsyncThunk(
  "orders/myorders",
  async (_, thunkAPI) => {
    try {
      const response = await orderService.fetchUserOrdersService();
      return response
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Something went wrong");
    }
  }
);

export const fetchOrderByIdSlice = createAsyncThunk(
  "orders/fetchById",
  async (id, thunkAPI) => {
    try {
      const response = await orderService.fetchOrderByIdService(id);
      return response
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Something went wrong");
    }
  }
)

export const createOrderSlice = createAsyncThunk(
  "orders/create",
  async (orderData, thunkAPI) => {
    try {
      const response = await orderService.createOrderService(orderData);
      return response
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Something went wrong");
    }
  }
)

export const fetchOrderHistorySlice = createAsyncThunk(
  "orders/orderhistory",
  async (_, thunkAPI) => {
    try {
      const response = await orderService.fetchOrderHistoryService();
      return response
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Something went wrong");
    }
  }
)

export const updateOrderStatusSlice = createAsyncThunk(
  "orders/update",
  async ({orderId, status}, thunkAPI) => {
    try {
      const response = await orderService.updateOrderStatusService({orderId, status});
      return response
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Something went wrong");
    }
  }
)

export const cancleOrderSlice = createAsyncThunk(
  "orders/cancel",
  async (id, thunkAPI) => {
    try {
      const response = await orderService.cancelOrderService(id);
      return response
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Something went wrong");
    }
  }
)

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrderError: () => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder

    //fetchAllOrders
    .addCase(fetchAllOrdersSlice.pending, (state) => {
      state.orderLoading = true
      state.error = null
    })
    .addCase(fetchAllOrdersSlice.fulfilled, (state, action) => {
      state.orderLoading = false
      state.orders = action.payload.data || []
      state.totalOrders = action.payload.totalOrders
      state.totalRevenue = action.payload.totalRevenue
    })
    .addCase(fetchAllOrdersSlice.rejected, (state, action) => {
      state.orderLoading = false
      state.error = action.payload
      state.totalOrders = 0
      state.totalRevenue = 0
    })

     //fetchOrderById
    .addCase(fetchOrderByIdSlice.pending, (state) => {
      state.orderLoading = true
      state.error = null
    })
    .addCase(fetchOrderByIdSlice.fulfilled, (state, action) => {
      state.orderLoading = false
      state.order = action.payload.data || action.payload
    })
    .addCase(fetchOrderByIdSlice.rejected, (state, action) => {
      state.orderLoading = false
      state.error = action.payload
    })

     //fetchMyOrdersSlice
    .addCase(fetchMyOrdersSlice.pending, (state) => {
      state.orderLoading = true
      state.error = null
    })
    .addCase(fetchMyOrdersSlice.fulfilled, (state, action) => {
      state.orderLoading = false
      state.orders = action.payload.data || []
      state.totalOrders = action.payload.totalOrders
    })
    .addCase(fetchMyOrdersSlice.rejected, (state, action) => {
      state.orderLoading = false
      state.error = action.payload
      state.totalOrders = 0
    })

    //fetchOrderHistorySlice
    .addCase(fetchOrderHistorySlice.pending, (state) => {
      state.orderLoading = true
      state.error = null
    })
    .addCase(fetchOrderHistorySlice.fulfilled, (state, action) => {
      state.orderLoading = false
      state.orders = action.payload.data || []
      state.totalOrders = action.payload.totalOrders
    })
    .addCase(fetchOrderHistorySlice.rejected, (state, action) => {
      state.orderLoading = false
      state.error = action.payload
      state.totalOrders = 0
    })

     //createOrderSlice
    .addCase(createOrderSlice.pending, (state) => {
      state.orderLoading = true
      state.error = null
    })
    .addCase(createOrderSlice.fulfilled, (state, action) => {
      state.orderLoading = false
      state.order = action.payload.data
    })
    .addCase(createOrderSlice.rejected, (state, action) => {
      state.orderLoading = false
      state.error = action.payload
    })

    //updateOrderStatusSlice
    .addCase(updateOrderStatusSlice.pending, (state) => {
      state.orderLoading = true
      state.error = null
    })
    .addCase(updateOrderStatusSlice.fulfilled, (state, action) => {
      state.orderLoading = false
      state.order = action.payload.data
    })
    .addCase(updateOrderStatusSlice.rejected, (state, action) => {
      state.orderLoading = false
      state.error = action.payload
    })
  }
})

export const {clearOrderError} = orderSlice.actions
export default orderSlice.reducer

