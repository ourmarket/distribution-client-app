import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/deliveryApp/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/deliveryApp/logout",
        method: "POST",
      }),
    }),
    refresh: builder.query({
      query: () => "/auth/deliveryApp/refresh",
      // keepUnusedDataFor: 3,
      extraOptions: { maxRetries: 5 },
    }),
  }),
});

export const { useLoginMutation, useRefreshQuery, useLogoutMutation } = authApi;
