import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    profile: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.profile = action.payload.profile;
    },
    logout: (state) => {
      state.user = null;
      state.profile = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
