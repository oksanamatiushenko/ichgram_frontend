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
      console.log("Register error:", error.response?.data); // <-- ответ сервера
      return rejectWithValue(error?.response?.data || { message: error?.message });
    }
  }
);
