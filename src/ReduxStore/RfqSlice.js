import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rfqData: [],
};

const RfqSlice = createSlice({
  name: "rfqStore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default RfqSlice.reducer;
