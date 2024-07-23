import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const searchProductQuery = createAsyncThunk(
  "searchProductStore/searchProductQuery",
  async ({ data, token, callback }) => {
    try {
      // Perform API call to fetch products
      const response = await axios.post(
        "https://brokerbinbackend.advertsedge.com/api/inventory/search",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (callback) callback();
      return response.data;
    } catch (error) {
      console.error(
        "Error while searching product:",
        error.response?.data || error.message
      );
      throw "Error while fetching user data:" || error;
    }
  }
);

const initialState = {
  companiesListingParts: true,
  graphToggle: false,
  filterToggle: true,
  popUpRfq: false,
  togglePopUp: false,
  selectedProducts: [],
  searchResponse: [],
  error: null,
  currentPage: 0,
  itemsPerPage: 20,
  gettingProducts: false,
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
    setSearchResponse: (state, action) => {
      state.searchResponse = action.payload;
    },
    setSelectedProducts: (state, action) => {
      state.selectedProducts = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = 0;
    },
    setCurrentPagePrev: (state, action) => {
      state.currentPage -= 1;
    },
    setCurrentPageNext: (state, action) => {
      state.currentPage += 1;
    },
    setGettingProducts: (state, action) => {
      state.gettingProducts != state.gettingProducts;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProductQuery.pending, (state) => {
        state.error = null;
        state.gettingProducts = false;
      })
      .addCase(searchProductQuery.fulfilled, (state, action) => {
        state.searchResponse = action.payload.data;
        state.gettingProducts = true;
      })
      .addCase(searchProductQuery.rejected, (state, action) => {
        state.error = action.error.message;
        console.error("Error while searching:", action.error.message);
        state.gettingProducts = false;
      });
  },
});

export const {
  setCompaniesListingParts,
  setGraphToggle,
  setFilterToggle,
  setPopUpRfq,
  setTogglePopUp,
  setSelectedProducts,
  setSearchResponse,
  setCurrentPagePrev,
  setCurrentPageNext,
  setCurrentPage,
} = searchProductSlice.actions;

export default searchProductSlice.reducer;
