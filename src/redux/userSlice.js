import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "orders",
  initialState: {
    deliveryTruck: null,
  },
  reducers: {
    getUser: (state, action) => {
      state.deliveryTruck = action.payload;
    },
    clearUser: (state, action) => {
      state.deliveryTruck = null;
    },
  },
});

export const { getUser, clearUser} =
  userSlice.actions;
export default userSlice.reducer;
