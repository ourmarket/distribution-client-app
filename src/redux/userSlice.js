import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "orders",
  initialState: {
    deliveryTruck: null,
  },
  reducers: {
    getUser: (state, action) => {
      state.deliveryTruck = action.payload;
      localStorage.setItem("truckId", action.payload.truckId);
      localStorage.setItem(
        "deliveryName",
        `${action.payload.user.name} ${action.payload.user.lastName}`
      );
    },
    clearUser: (state, action) => {
      state.deliveryTruck = null;
      localStorage.removeItem("truckId");
      localStorage.removeItem("deliveryName");
    },
  },
});

export const { getUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
