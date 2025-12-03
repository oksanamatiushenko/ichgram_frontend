import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: null,
  loading: false,
  error: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
 
});

export default authSlice.reducer;