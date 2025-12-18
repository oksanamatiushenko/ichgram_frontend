import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authApi from "../../shared/api/auth-api";
import { setCredentials, logout } from "./authSlice";

export const registerUser = createAsyncThunk(
  "auth/signup",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await authApi.register(payload);
      return data;
    } catch (error) {
      return rejectWithValue({
        message: error?.response?.data?.message || error?.message,
      });
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const data = await authApi.login(payload);

      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      dispatch(setCredentials(data));

      return data;
    } catch (error) {
      // Если логин неверный, показываем ошибку под полем email
      const message = error?.response?.data?.message || error?.message;

      if (message.toLowerCase().includes("not found")) {
        return rejectWithValue({ email: message });
      } else {
        return rejectWithValue({ password: message });
      }
    }
  }
);


export const getCurrentUser = createAsyncThunk(
  "auth/current",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      if (!auth.accessToken) throw new Error("No access token");

      const data = await authApi.getCurrent(auth.accessToken);
      return data;
    } catch (error) {
      return rejectWithValue({
        message: error?.response?.data?.message || error?.message,
      });
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await authApi.logout(); 

      dispatch(logout());

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");

      return { message: "Logout successful" };
    } catch (error) {
      return rejectWithValue({
        message: error?.response?.data?.message || error?.message,
      });
    }
  }
);
