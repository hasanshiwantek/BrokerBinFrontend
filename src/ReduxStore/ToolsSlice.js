import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const sendEthics = createAsyncThunk(
  "toolsStore/sendEthics",
  async ({ data, token }) => {
    console.log(data);
    try {
      const response = await axios.post(
        "https://brokerbinbackend.shiwantek.com/api/ethics/store",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error("Error sending ethics");
    }
  }
);

export const searchCompanyName = createAsyncThunk(
  "toolsStore/searchCompanyName",
  async ({ search, token }) => {
    try {
      const response = await axios.post(
        "https://brokerbinbackend.shiwantek.com/api/vendor/search",
        { search },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      return response.data.companies;
    } catch (error) {
      throw new Error("Error searching company name");
    }
  }
);

export const searchMyVendors = createAsyncThunk(
  "toolsStore/searchMyVendors",
  async ({ search, token }) => {
    try {
      const response = await axios.post(
        "https://brokerbinbackend.shiwantek.com/api/vendor/search",
        { search },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.companies;
    } catch (error) {
      throw new Error("Error searching company name");
    }
  }
);

export const getMyVendors = createAsyncThunk(
  "toolsStore/getMyVendors",
  async ({ token }) => {
    try {
      const response = await axios.get(
        "https://brokerbinbackend.shiwantek.com/api/vendor",
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
      throw new Error("Error searching company name");
    }
  }
);

export const addMyVendors = createAsyncThunk(
  "toolsStore/addMyVendors",
  async ({ companyId, token }) => {
    console.log(companyId);

    try {
      const response = await axios.post(
        "https://brokerbinbackend.shiwantek.com/api/vendor/is_fav",
        companyId,
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

export const removeMyVendors = createAsyncThunk(
  "toolsStore/removeMyVendors",
  async ({ companyId, token }) => {
    console.log(companyId);

    try {
      const response = await axios.post(
        "https://brokerbinbackend.shiwantek.com/api/vendor/is_fav",
        companyId,
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

const initialState = {
  tools: [],
  searchCompanies: [],
  searchMyVendor: [],
  myVendor: [],
  loading: false,
};
const ToolsSlice = createSlice({
  name: "toolsStore",
  initialState,
  reducers: {
    addTool(state, action) {
      state.tools.push(action.payload);
    },
    removeTool(state, action) {
      state.tools = state.tools.filter((tool) => tool.id !== action.payload);
    },
    setMyVendor(state, action) {
      state.myVendor.push(action.payload);
    },
    setEmptySearchCompanies(state, action) {
      state.searchMyVendor = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendEthics.pending, (state) => {
        console.log("Sending...");
      })
      .addCase(sendEthics.fulfilled, (state, action) => {
        state.tools.push(action.payload);
      })
      .addCase(sendEthics.rejected, (state, action) => {
        console.error("Error sending ethics", action.error);
      })
      .addCase(searchCompanyName.pending, (state) => {
        console.log("Searching...");
      })
      .addCase(searchCompanyName.fulfilled, (state, action) => {
        state.searchCompanies = action.payload;
      })
      .addCase(searchCompanyName.rejected, (state, action) => {
        console.error("Error searching company name", action.error);
      })
      .addCase(searchMyVendors.pending, (state) => {
        console.log("Searching...");
      })
      .addCase(searchMyVendors.fulfilled, (state, action) => {
        state.searchMyVendor = action.payload;
      })
      .addCase(searchMyVendors.rejected, (state, action) => {
        console.error("Error searching company name", action.error);
      })
      .addCase(getMyVendors.pending, (state) => {
        console.log("Searching...");
        state.loading = true;
      })
      .addCase(getMyVendors.fulfilled, (state, action) => {
        console.log(action.payload);
        state.myVendor = action.payload;
        state.loading = false;
      })
      .addCase(getMyVendors.rejected, (state, action) => {
        console.error("Error searching company name", action.error);
        state.loading = false;
      })
      .addCase(addMyVendors.pending, (state) => {
        console.log("Searching...");
        state.loading = true;
      })
      .addCase(addMyVendors.fulfilled, (state, action) => {
        console.log(action.payload);
        state.myVendor.push(action.payload.data); // Immediately add the new vendor
        state.loading = false;

        // state.myVendor.push(action.payload);
      })
      .addCase(addMyVendors.rejected, (state, action) => {
        console.error("Error searching company name", action.error);
        state.loading = false;
      })
      .addCase(removeMyVendors.pending, (state) => {
        console.log("Searching...");
        state.loading = true;
      })
      .addCase(removeMyVendors.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.myVendor = state.myVendor.filter(
          (vendor) => vendor.company.id !== action.payload.data.company.id
        ); // Immediately remove the vendor
      })
      .addCase(removeMyVendors.rejected, (state, action) => {
        console.error("Error searching company name", action.error);
        state.loading = true;
      });
  },
});

export const { addTool, removeTool, setMyVendor, setEmptySearchCompanies } =
  ToolsSlice.actions;

export default ToolsSlice.reducer;
