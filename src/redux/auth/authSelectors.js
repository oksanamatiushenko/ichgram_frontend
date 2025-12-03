import { createSelector } from "@reduxjs/toolkit";

export const selectAuthRequest = createSelector(
  (store) => store.auth,
  (auth) => ({
    loading: auth.loading,
    error: auth.error,
    isRegisterSuccess: auth.isRegisterSuccess,
  })
);
