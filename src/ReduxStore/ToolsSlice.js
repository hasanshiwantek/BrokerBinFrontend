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
      console.log(response);
      return response.data.companies;
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
      state.myVendor = action.payload;
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
        console.log(action.payload);
        state.searchCompanies = action.payload;
      })
      .addCase(searchCompanyName.rejected, (state, action) => {
        console.error("Error searching company name", action.error);
      })
      .addCase(searchMyVendors.pending, (state) => {
        console.log("Searching...");
      })
      .addCase(searchMyVendors.fulfilled, (state, action) => {
        console.log(action.payload);
        state.searchMyVendor = action.payload;
      })
      .addCase(searchMyVendors.rejected, (state, action) => {
        console.error("Error searching company name", action.error);
      });
  },
});

export const { addTool, removeTool, setMyVendor, setEmptySearchCompanies } =
  ToolsSlice.actions;

export default ToolsSlice.reducer;
