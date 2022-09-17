import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: null,
    pending: null,
    delivered: null,
    refused: null,

  },
  reducers: {
    
    getOrders:(state, action) => {
      state.orders = action.payload;
    },
    getPending:(state, action) => {
      state.orders.pending = action.payload;
    },
    getDelivered:(state, action) => {
      state.orders.delievered = action.payload;
    },
    getRefused:(state, action) => {
      state.orders.refused = action.payload;
    },
    
  },
});

export const {getOrders, getPending, getDelivered, getRefused} = orderSlice.actions;
export default orderSlice.reducer;