import { createAsyncThunk } from "@reduxjs/toolkit";

import * as authApi from "../../shared/api/auth-api";

export const registerUser = createAsyncThunk(
  "register",
  async (payload, { rejectWithValue }) => {
    console.log("Register payload:", payload); // <-- дебаг
    try {
      const data = await authApi.register(payload);
      return data;
    } catch (error) {
      console.log("Register error:", error.response?.data);
      return rejectWithValue(error?.response?.data || { message: error?.message });
    }
  }
);

export const loginUser = createAsyncThunk(
  "login",
  async (payload, { rejectWithValue }) => {
    console.log("Login payload:", payload);
    try {
      const data = await authApi.login(payload);
      return data;
    } catch (error) {
      console.log("Login error:", error.response?.data);
      return rejectWithValue(error?.response?.data || { message: error?.message });
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "current",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const data = await authApi.getCurrent(auth.accessToken);
      return data;
    } catch (error) {
      return rejectWithValue({
        email: error?.response?.data.message || error?.message,
      });
    }
  }
);

export const logoutUser = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue }) => {
    try {
      const data = await authApi.logout();

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");

      return data;
    } catch (error) {
      console.log("Logout error:", error.response?.data);
      return rejectWithValue(
        error?.response?.data || { message: error?.message }
      );
    }
  }
);

