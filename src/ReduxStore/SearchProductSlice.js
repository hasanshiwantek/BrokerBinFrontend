import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { brokerAPI } from "../components/api/BrokerEndpoint";


export const searchProductQuery = createAsyncThunk(
  "searchProductStore/searchProductQuery",
  async ({ token, page, search }) => {
    console.log(search);
    try {
      const response = await axios.post(
        `${brokerAPI}inventory/search`,
        {
          page, // Send 'page' in the request body
          search, // Send 'search' in the request body
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
export const searchByKeyword = createAsyncThunk(
  "searchProductStore/searchByKeyword",
  async ({ token, page, partModel }) => {
    console.log(partModel);
    try {
      const response = await axios.post(
        `${brokerAPI}inventory/partmodel`,
        {
          page, // Send 'page' in the request body
          partModel, // Send 'partModel' in the request body
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
    console.log(filters);
    try {
      const response = await axios.post(
        `${brokerAPI}inventory/fetch`,
        filters,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
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
        `${brokerAPI}inventory/search/history`,
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

export const addToHotList = createAsyncThunk(
  "searchProductStore/addToHotList",
  async ({ token, hotlists }) => {
    console.log(JSON.stringify({ hotlists }));
    try {
      const response = await axios.post(
        `${brokerAPI}hot-lists/store`,
        JSON.stringify({ hotlists }),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

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

const initialState = {
  companiesListingParts: true,
  graphToggle: false,
  filterToggle: true,
  popUpRfq: false,
  togglePopUp: false,
  searchResponseMatched: [],
  searchResponseNotMatched: [],
  popupCompanyDetail: [],
  hoverCompanyDetail: [],
  selectedProducts: [],
  searchHistory: [],
  error: null,
  page: 1,
  pageSize: 20,
  totalCount: 0,
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

    // setTogglePopUp: (state, action) => {
    //   state.togglePopUp = !state.togglePopUp;
    //   console.log("Popup",action.payload)
    //   console.log("Popup state",state)

    // },

    setTogglePopUp: (state, action) => {
      // If a payload is provided, use it to set the state, otherwise toggle
      state.togglePopUp = action.payload !== undefined ? action.payload : !state.togglePopUp;
      console.log("Popup Toggle:", state.togglePopUp);
    },
    setSearchResponse: (state, action) => {
      state.searchResponseMatched = action.payload.data;
    },
    setPopupCompanyDetail: (state, action) => {
      state.popupCompanyDetail = action.payload;
      console.log("CompanyDetails",action.payload)

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
    setHoverCompanyDetail: (state, action) => {
      state.hoverCompanyDetail = [action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProductQuery.pending, (state) => {
        state.gettingProducts = true; // Set to true when starting the fetch
        state.error = null;
      })
      .addCase(searchProductQuery.fulfilled, (state, action) => {
        state.searchResponseMatched = action.payload.data;
        state.searchResponseNotMatched = action.payload.notFoundKeywords;
        state.totalCount = action.payload.totalCount;
        state.gettingProducts = false; // Set to false after fetching is done
      })
      .addCase(searchProductQuery.rejected, (state, action) => {
        state.error = action.error.message;
        console.error("Error while searching:", action.error.message);
        state.gettingProducts = false; // Set to false if the fetch fails
      })
      .addCase(searchByKeyword.pending, (state) => {
        state.gettingProducts = true; // Set to true when starting the fetch
        state.error = null;
      })
      .addCase(searchByKeyword.fulfilled, (state, action) => {
        state.searchResponseMatched = action.payload.foundItems;
        state.searchResponseNotMatched = action.payload.notFoundPartModels;
        state.totalCount = action.payload.totalCount;
        state.gettingProducts = false; // Set to false after fetching is done
      })
      .addCase(searchByKeyword.rejected, (state, action) => {
        state.error = action.error.message;
        console.error(
          "Error while searching by keyword:",
          action.error.message
        );
        state.gettingProducts = false; // Set to false if the fetch fails
      })
      .addCase(searchProductFilter.pending, (state) => {
        state.gettingProducts = true; // Set to true when starting the fetch
        state.error = null;
      })
      .addCase(searchProductFilter.fulfilled, (state, action) => {
        console.log(action.payload);
        state.searchResponseMatched = action.payload;
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
      })
      .addCase(addToHotList.pending, (state) => {
        // state.gettingHistory = true; // Set to true when starting the fetch
        // state.error = null;
      })
      .addCase(addToHotList.fulfilled, (state, action) => {
        // state.searchHistory = action.payload;
        console.log(action.payload);
        state.gettingHistory = false; // Set to false after fetching is done
      })
      .addCase(addToHotList.rejected, (state, action) => {
        state.error = action.error.message;
        console.error("Error while adding to hotlist:", action.error.message);
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
  setHoverCompanyDetail,
} = searchProductSlice.actions;

export default searchProductSlice.reducer;
