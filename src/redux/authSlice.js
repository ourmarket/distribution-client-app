import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authDelivery",
  initialState: {
    user: null,
    token: null,
    superUser: null,
    version: null,
    superUserData: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { id, accessToken, superUser, version, superUserData } =
        action.payload;
      state.user = id;
      state.token = accessToken;
      state.superUser = superUser;
      state.version = version;
      state.superUserData = superUserData;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.superUser = null;
      state.version = null;
      state.superUserData = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.authDelivery.user;
export const selectCurrentToken = (state) => state.authDelivery.token;
