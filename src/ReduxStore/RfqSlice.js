import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  togglePopUp: false,
  rfqMailCheckAll: false,
  currentPage: 1,
  rfqPopBoxInfo: [],
  rfqMail: [],
};

const RfqSlice = createSlice({
  name: "rfqStore",
  initialState,
  reducers: {
    setTogglePopUp: (state, action) => {
      state.togglePopUp = !state.togglePopUp;
    },
    setRfqPopBoxInfo: (state, { payload }) => {
      state.rfqPopBoxInfo = payload;
    },
    setRfqMail: (state, { payload }) => {
      state.rfqMail = payload;
    },
    setRfqMailCheckAll: (state, { payload }) => {
      state.rfqMailCheckAll = payload;
    },
    setCurrentPagePrev: (state, action) => {
      state.currentPage -= 1;
    },
    setCurrentPageNext: (state, action) => {
      state.currentPage += 1;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  setTogglePopUp,
  setRfqPopBoxInfo,
  setRfqMail,
  setRfqMailCheckAll,
  setCurrentPagePrev,
  setCurrentPageNext,
} = RfqSlice.actions;

export default RfqSlice.reducer;
