import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getMatchYourHits = createAsyncThunk(
  "reports/getMatchYourHits",
  async ({ token }) => {
    try {
      const response = await axios.post(
        "https://brokerbinbackend.shiwantek.com/api/report/match_hits",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get match your hits");
    }
  }
);

export const getSupplyAndDemand = createAsyncThunk(
  "reports/supplyAndDemand",
  async ({ token, supplyAndDemandQuery }) => {
    console.log(supplyAndDemandQuery);
    try {
      const response = await axios.post(
        "https://brokerbinbackend.shiwantek.com/api/report/supply",
        supplyAndDemandQuery,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get match your hits");
    }
  }
);

export const searchCompany = createAsyncThunk(
  "reports/searchCompany",
  async ({ name, token }) => {
    console.log(name, token);
    try {
      const response = await axios.post(
        "https://brokerbinbackend.shiwantek.com/api/company/search",
        { name },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error("Error searching company name");
    }
  }
);

export const getCompanyInventory = createAsyncThunk(
  "reports/getCompanyInventory",
  async ({ token, id, page }) => {
    console.log(id, page);
    try {
      const response = await axios.get(
        `https://brokerbinbackend.shiwantek.com/api/inventory/company/${id}?page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error("Error searching company name");
    }
  }
);

export const getTopSearch = createAsyncThunk(
  "reports/getTopSearch",
  async ({ token, parameter }) => {
    console.log(parameter);
    try {
      const response = await axios.post(
        "https://brokerbinbackend.shiwantek.com/api/report/topsearch",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data);
      return response.data.data[parameter];
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get match your hits");
    }
  }
);

export const getTopSearchByManufacturer = createAsyncThunk(
  "reports/getTopSearchByManufacturer",
  async ({ token, parameter, mfg }) => {
    console.log(token, parameter, mfg);
    try {
      const response = await axios.post(
        "https://brokerbinbackend.shiwantek.com/api/report/mfg_filter",
        { mfg },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Adjust the data extraction based on the API's response structure
      console.log(response.data);
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get top searches by manufacturer");
    }
  }
);

const initialState = {
  matchYourHits: [],
  supplyAndDemandQuery: null,
  supplyAndDemandData: [],
  topSearchData: [],
  searchCompanyData: [],
  searchedCompanyInventory: [],
  loading: false,
  pageSize: 20,
  totalCount: 0,
  error: null,
};
const Reports = createSlice({
  name: "reports",
  initialState,
  reducers: {
    setSupplyAndDemandQuery: (state, action) => {
      state.supplyAndDemandQuery = action.payload;
    },
    setSearchCompanyData(state, action) {
      state.searchCompanyData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMatchYourHits.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMatchYourHits.fulfilled, (state, action) => {
        state.matchYourHits = action.payload;
        state.loading = false;
      })
      .addCase(getMatchYourHits.rejected, (state, action) => {
        console.error("Error fetching matchYourHits:", action.error.message);
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getSupplyAndDemand.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSupplyAndDemand.fulfilled, (state, action) => {
        state.supplyAndDemandData = action.payload;
        state.loading = false;
      })
      .addCase(getSupplyAndDemand.rejected, (state, action) => {
        console.error("Error fetching supplyAndDemand:", action.error.message);
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getTopSearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTopSearch.fulfilled, (state, action) => {
        state.topSearchData = action.payload;
        state.loading = false;
      })
      .addCase(getTopSearch.rejected, (state, action) => {
        console.error("Error fetching topSearch:", action.error.message);
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchCompany.fulfilled, (state, action) => {
        state.searchCompanyData = action.payload;
        state.loading = false;
      })
      .addCase(searchCompany.rejected, (state, action) => {
        console.error(
          "Error searching company inventory:",
          action.error.message
        );
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getCompanyInventory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCompanyInventory.fulfilled, (state, action) => {
        state.searchedCompanyInventory = action.payload.data;
        state.totalCount = action.payload.pagination.total;
        state.loading = false;
      })
      .addCase(getCompanyInventory.rejected, (state, action) => {
        console.error(
          "Error searching company inventory:",
          action.error.message
        );
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getTopSearchByManufacturer.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTopSearchByManufacturer.fulfilled, (state, action) => {
        state.topSearchData = action.payload;
        state.loading = false;
      })
      .addCase(getTopSearchByManufacturer.rejected, (state, action) => {
        console.error(
          "Error fetching top searches by manufacturer:",
          action.error.message
        );
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSupplyAndDemandQuery, setSearchCompanyData } =
  Reports.actions;

export default Reports.reducer;
