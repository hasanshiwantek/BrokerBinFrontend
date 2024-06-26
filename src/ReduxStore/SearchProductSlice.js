import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companiesListingParts: true,
  graphToggle: false,
  filterToggle: true,
  popUpRfq: false,
  togglePopUp: false,
  selectedProducts: [],
};

const searchProductSlice = createSlice({
  name: "searchProductStore",
  initialState,
  reducers: {
    setCompaniesListingParts: (state, action) => {
      state.companiesListingParts = !state.companiesListingParts;
    },
    setGraphToggle: (state, action) => {
      state.graphToggle = !state.graphToggle;
    },
    setFilterToggle: (state, action) => {
      state.filterToggle = !state.filterToggle;
    },
    setPopUpRfq: (state, action) => {
      state.popUpRfq = !state.popUpRfq;
    },
    setTogglePopUp: (state, action) => {
      state.togglePopUp = !state.togglePopUp;
    },
    setSelectedProducts: (state, action) => {
      state.selectedProducts = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  setCompaniesListingParts,
  setGraphToggle,
  setFilterToggle,
  setPopUpRfq,
  setTogglePopUp,
  setSelectedProducts,
} = searchProductSlice.actions;

export default searchProductSlice.reducer;
