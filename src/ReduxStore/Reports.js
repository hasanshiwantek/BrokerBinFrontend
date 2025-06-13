import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { brokerAPI } from "../components/api/BrokerEndpoint";

export const getMatchYourHits = createAsyncThunk(
  "reports/getMatchYourHits",
  async ({ token }) => {
    try {
      const response = await axios.post(
        `${brokerAPI}report/match_hits`,
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

export const getMatchYourMfgHits = createAsyncThunk(
  "reports/getMatchYourMfgHits",
  async ({ token, mfg }) => {
    try {
      const response = await axios.post(
        `${brokerAPI}report/match_hits`,
        { mfg },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(
        "Match your hits data with selected MFG: ",
        response.data.data
      );
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get match your hits with selected Mfgs");
    }
  }
);

export const getSupplyAndDemand = createAsyncThunk(
  "reports/supplyAndDemand",
  async ({ token, supplyAndDemandQuery }) => {
    console.log(supplyAndDemandQuery);
    try {
      const response = await axios.post(
        `${brokerAPI}report/supply`,
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
        `${brokerAPI}company/search`,
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
        `${brokerAPI}inventory/company/${id}?page=${page}`,
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

export const getSortCompanyInventory = createAsyncThunk(
  "reports/getSortCompanyInventory ",
  async ({ token, id, page, sortBy, sortOrder }) => {
    try {
      const response = await axios.get(
        `${brokerAPI}inventory/company/${id}?page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
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
      throw new Error("Error Sorting company Inventory");
    }
  }
);

export const getTopSearch = createAsyncThunk(
  "reports/getTopSearch",
  async ({ token, range, mfg }) => {
    console.log(range);
    try {
      const response = await axios.post(
        `${brokerAPI}report/topsearch`,
        { range, mfg },
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

export const getTopSearchByMfg = createAsyncThunk(
  "reports/getTopSearchByMfg",
  async ({ token, range, mfg }) => {
    console.log(token, range, mfg);
    try {
      const response = await axios.post(
        `${brokerAPI}report/mfg_filter`,
        { mfg, range },
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

export const getTopSearchByManufacturer = createAsyncThunk(
  "reports/getTopSearchByManufacturer",
  async ({ token, range, mfg }) => {
    console.log(token, range, mfg);
    try {
      const response = await axios.post(
        `${brokerAPI}report/mfg_filter`,
        { mfg, range },
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

export const getDetailedInventory = createAsyncThunk(
  "reports/getDetailedInventory",
  async ({ token, payload }) => {
    try {
      const response = await axios.post(
        `${brokerAPI}report/detailed`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch detailed inventory");
    }
  }
);

export const submitEmailReportSettings = createAsyncThunk(
  "reports/submitEmailReportSettings",
  async ({ payload, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${brokerAPI}emailoption/email-option`,
        payload, // ✅ send raw payload directly
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Email Submission Response From Redux:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// Replace with your actual endpoint
export const fetchEmailReportSettings = createAsyncThunk(
  "reports/fetchEmailReportSettings",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${brokerAPI}emailoption/get-email-option`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("✅Fetching Email Response From Redux: ", response.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch email report settings"
      );
    }
  }
);

const initialState = {
  matchYourHits: [],
  supplyAndDemandQuery: null,
  supplyAndDemandData: [],
  detailedInventory: {},
  topSearchData: [],
  topSearchMfgData: [],
  searchCompanyData: [],
  searchedCompanyInventory: [],
  vendorListData: {},
  emailSettingsData: {},
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
    setVendorListData(state, action) {
      state.vendorListData = action.payload;
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
      .addCase(getMatchYourMfgHits.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMatchYourMfgHits.fulfilled, (state, action) => {
        state.matchYourHits = action.payload;
        state.loading = false;
      })
      .addCase(getMatchYourMfgHits.rejected, (state, action) => {
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
      .addCase(getDetailedInventory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDetailedInventory.fulfilled, (state, action) => {
        state.detailedInventory = action.payload;
        state.loading = false;
      })
      .addCase(getDetailedInventory.rejected, (state, action) => {
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

      .addCase(getTopSearchByMfg.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTopSearchByMfg.fulfilled, (state, action) => {
        state.topSearchData = action.payload;
        state.loading = false;
      })
      .addCase(getTopSearchByMfg.rejected, (state, action) => {
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

      .addCase(getSortCompanyInventory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSortCompanyInventory.fulfilled, (state, action) => {
        state.searchedCompanyInventory = action.payload.data;
        state.totalCount = action.payload.pagination.total;
        state.loading = false;
      })
      .addCase(getSortCompanyInventory.rejected, (state, action) => {
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
        state.topSearchMfgData = action.payload;
        state.loading = false;
      })
      .addCase(getTopSearchByManufacturer.rejected, (state, action) => {
        console.error(
          "Error fetching top searches by manufacturer:",
          action.error.message
        );
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchEmailReportSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmailReportSettings.fulfilled, (state, action) => {
        state.emailSettingsData = action.payload;
        state.loading = false;
      })
      .addCase(fetchEmailReportSettings.rejected, (state, action) => {
        console.error("Error Email Settings Data: ", action.error.message);
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setSupplyAndDemandQuery,
  setSearchCompanyData,
  setVendorListData,
} = Reports.actions;

export default Reports.reducer;
