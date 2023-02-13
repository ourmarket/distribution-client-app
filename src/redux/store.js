import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import uiReducer from "./uiSlice";
import orderReducer from "./ordersSlice";
import userReducer from "./userSlice";
import productsReducer from "./productsSlice";
import { authApi } from "../api/apiAuth";

export const store = configureStore({
  reducer: {
    authDelivery: authReducer,
    ui: uiReducer,
    order: orderReducer,
    user: userReducer,
    products: productsReducer,
   [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware),
});