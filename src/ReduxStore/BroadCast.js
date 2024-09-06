import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const sendBroadcast = createAsyncThunk(
  "broadcastStore/sendBroadcast",
  async ({ data, token }) => {
    try {
      const response = await axios.post(
        "https://brokerbin.shiwantek.com/api/broadcast/store",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(
        "Error while fetching user data:",
        error.response?.data || error.message
      );
      throw "Error while sending broadcast:" || error;
    }
  }
);

const initialState = {
  computerSelection: [],
  telecomSelection: [],
  mobileDevicesSelection: [],
  companiesSelection: [],
  regionSelection: [],
};

const broadcastSlice = createSlice({
  name: "broadcastStore",
  initialState,
  reducers: {
    setComputerSelection: (state, action) => {
      state.computerSelection = action.payload;
    },
    setTelecomSelection: (state, action) => {
      state.telecomSelection = action.payload;
    },
    setMobileDevicesSelection: (state, action) => {
      state.mobileDevicesSelection = action.payload;
    },
    setCompaniesSelection: (state, action) => {
      state.companiesSelection = action.payload;
    },
    setRegionSelection: (state, action) => {
      state.regionSelection = action.payload;
    },
  },
  //   extraReducers: (builder) => {
  // builder.addcase()
  // Add reducers for other actions here.
  //   },
});
export const {
  setComputerSelection,
  setTelecomSelection,
  setMobileDevicesSelection,
  setCompaniesSelection,
  setRegionSelection,
} = broadcastSlice.actions;

export default broadcastSlice.reducer;
