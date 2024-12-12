import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Logged-in user details
  token: null, // User authentication token
};

const userSlice = createSlice({
  name: "userStore",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      console.log("PAYLOADIN REDUCER", action.payload)
      state.user = action.payload.user; // Save user details
      state.token = action.payload.token; // Save token
      console.log("Updated User in Store:", state.user);
    },
    clearUserDetails: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUserDetails, clearUserDetails } = userSlice.actions;

export default userSlice.reducer;
