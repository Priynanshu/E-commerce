import { createSlice } from "@reduxjs/toolkit";
import { orders } from "../../data/dummy";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders,
  },
  reducers: {
    addOrder: (state, action) => {
      state.orders.unshift(action.payload);
    },
    cancelOrder: (state, action) => {
      const order = state.orders.find((o) => o._id === action.payload);
      if (order) order.status = "cancelled";
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find((o) => o._id === orderId);
      if (order) order.status = status;
    },
  },
});

export const { addOrder, cancelOrder, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
