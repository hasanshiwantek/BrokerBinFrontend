import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const searchProductQuery = createAsyncThunk(
  "searchProductStore/searchProductQuery",
  async ({ token, page, pageSize, search }) => {
    try {
      const response = await axios.post(
        `https://brokerbin.shiwantek.com/api/inventory/search`,
        JSON.stringify({ page, pageSize, search }),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // console.log(response)
      return response.data;
    } catch (error) {
      console.error(
        "Error while searching product:",
        error.response?.data || error.message
      );
      throw error.response?.data || error.message;
    }
  }
);

export const searchProductFilter = createAsyncThunk(
  "searchProductStore/searchProductFilter",
  async ({ token, filters }) => {
    try {
      const response = await axios.post(
        `https://brokerbin.shiwantek.com/api/inventory/fetch`,
        JSON.stringify(filters),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      return response.data;
    } catch (error) {
      console.error(
        "Error while searching product:",
        error.response?.data || error.message
      );
      throw error.response?.data || error.message;
    }
  }
);

export const searchProductHistory = createAsyncThunk(
  "searchProductStore/searchProductHistory",
  async ({ token }) => {
    try {
      const response = await axios.get(
        `https://brokerbin.shiwantek.com/api/inventory/search/history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.history;
    } catch (error) {
      console.error(
        "Error while searching product:",
        error.response?.data || error.message
      );
      throw error.response?.data || error.message;
    }
  }
);

const initialState = {
  companiesListingParts: true,
  graphToggle: false,
  filterToggle: true,
  popUpRfq: false,
  togglePopUp: false,
  searchResponse: [],
  popupCompanyDetail: [],
  selectedProducts: [],
  searchHistory: [],
  error: null,
  page: 1,
  pageSize: 20,
  gettingProducts: false,
  gettingHistory: false,
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
      state.searchResponse = action.payload.data;
    },
    setPopupCompanyDetail: (state, action) => {
      state.popupCompanyDetail = action.payload;
    },
    setSelectedProducts: (state, action) => {
      state.selectedProducts = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.page = 1;
    },
    setCurrentPagePrev: (state, action) => {
      state.page -= 1;
    },
    setCurrentPageNext: (state, action) => {
      state.page += 1;
    },
    setGettingProducts: (state) => {
      state.gettingProducts = !state.gettingProducts;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProductQuery.pending, (state) => {
        state.gettingProducts = true; // Set to true when starting the fetch
        state.error = null;
      })
      .addCase(searchProductQuery.fulfilled, (state, action) => {
        state.searchResponse = action.payload;
        state.gettingProducts = false; // Set to false after fetching is done
      })
      .addCase(searchProductQuery.rejected, (state, action) => {
        state.error = action.error.message;
        console.error("Error while searching:", action.error.message);
        state.gettingProducts = false; // Set to false if the fetch fails
      })
      .addCase(searchProductFilter.pending, (state) => {
        state.gettingProducts = true; // Set to true when starting the fetch
        state.error = null;
      })
      .addCase(searchProductFilter.fulfilled, (state, action) => {
        state.searchResponse = action.payload;
        state.gettingProducts = false; // Set to false after fetching is done
      })
      .addCase(searchProductFilter.rejected, (state, action) => {
        state.error = action.error.message;
        console.error("Error while filtering:", action.error.message);
        state.gettingProducts = false; // Set to false if the fetch fails
      })
      .addCase(searchProductHistory.pending, (state) => {
        state.gettingHistory = true; // Set to true when starting the fetch
        state.error = null;
      })
      .addCase(searchProductHistory.fulfilled, (state, action) => {
        state.searchHistory = action.payload;
        state.gettingHistory = false; // Set to false after fetching is done
      })
      .addCase(searchProductHistory.rejected, (state, action) => {
        state.error = action.error.message;
        console.error("Error while fetching history:", action.error.message);
        state.gettingHistory = false; // Set to false if the fetch fails
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
  setPopupCompanyDetail,
} = searchProductSlice.actions;

export default searchProductSlice.reducer;
