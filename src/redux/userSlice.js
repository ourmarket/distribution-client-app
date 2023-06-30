import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "orders",
  initialState: {
    deliveryTruck: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.deliveryTruck = action.payload;
      localStorage.setItem("deliveryData", JSON.stringify(action.payload));
    },
    getUser: (state) => {
      state.deliveryTruck = JSON.parse(localStorage.getItem("deliveryData"));
    },
    clearUser: (state) => {
      state.deliveryTruck = null;
      localStorage.removeItem("deliveryData");
    },
  },
});

export const { setUser, getUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
