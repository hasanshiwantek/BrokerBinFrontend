import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { brokerAPI } from "../components/api/BrokerEndpoint";
export const sendEthics = createAsyncThunk(
  "toolsStore/sendEthics",
  async ({ data, token }) => {
    console.log(data);
    try {
      const response = await axios.post(
        `${brokerAPI}ethics/store`,
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
        `${brokerAPI}vendor/search`,
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
        `${brokerAPI}vendor/search`,
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
      `${brokerAPI}vendor`,
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
        `${brokerAPI}vendor/is_fav`,
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
        `${brokerAPI}vendor/is_fav`,
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

export const addHotListItem = createAsyncThunk(
  "toolsStore/addHotListItem",
  async ({ hotlists, token }) => {
    console.log({ hotlists });

    try {
      const response = await axios.post(
        `${brokerAPI}hot-lists/store`,
        { hotlists },
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

export const showHotListItem = createAsyncThunk(
  "toolsStore/addHotListItem",
  async ({ token }) => {
    console.log(token);
    try {
      const response = await axios.get(
        `${brokerAPI}hot-lists`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("HotListdata:", response.data);
      return response.data.data;
    } catch (error) {
      throw new Error("Error searching company name");
    }
  }
);

export const editHotListItem = createAsyncThunk(
  "toolsStore/editHotListItem",
  async ({ token, hotlists }) => {
    console.log("HotListItem:", hotlists);
    try {
      const response = await axios.post(
        `${brokerAPI}hot-lists/update`,
        { hotlists },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("HotListdata:", response.data);
      return response.data.data;
    } catch (error) {
      console.error("Error:", error);
      throw new Error("Error updating hot list");
    }
  }
);






export const deleteHotlists = createAsyncThunk(
  "inventoryStore/deleteHotlists ",
  async ({ token, ids }) => {
    console.log(token, "Attempting to delete Hotlists with IDs:", ids);
    try {
      const response = await axios.delete(
        `${brokerAPI}hot-lists/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: { ids } // Pass 'Ids' as part of the request body
        }
      );
      return response.data; // Assuming the backend returns the deleted IDs or a success message
    } catch (error) {
      console.error("Error Deleting Hotlists:", error.response?.data);
      throw error.response?.data; // Propagate the error message
    }
  }
);



const initialState = {
  tools: [],
  searchCompanies: [],
  searchMyVendor: [],
  myVendor: [],
  myHotListItems: [],
  broadcastFilters: {
    daily_broadcast: 0,
    broadcasts: 0,
    type_of_broadcast: ["wtb", "rfq"],
    mfg: ["kaif"],
    categories: ["hardware"],
    services: ["seo"],
    groupings: ["bulk"],
    region: ["uk"],
    country: ["use"],
  },
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
    // showHotList(state, action) {
    //   state.myHotListItems.push(action.payload);
    // },
    setBroadcastFilters: (state, action) => {
      state.broadcastFilters = {
        ...state.broadcastFilters,
        ...action.payload,
      };
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
      })
      .addCase(showHotListItem.pending, (state) => {
        console.log("Searching...");
        state.loading = true;
      })
      .addCase(showHotListItem.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.myHotListItems = action.payload;
      })
      .addCase(showHotListItem.rejected, (state, action) => {
        console.error("Error searching company name", action.error);
        state.loading = true;
      })
      .addCase(editHotListItem.pending, (state) => {
        console.log("Searching...");
        state.loading = true;
      })
      .addCase(editHotListItem.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.myHotListItems = action.payload;
      })
      .addCase(editHotListItem.rejected, (state, action) => {
        console.error("Error searching company name", action.error);
        state.loading = true;
      })
      .addCase(deleteHotlists.pending, (state) => {
        console.log("DELETING HOTLISTS....");
      })
      .addCase(deleteHotlists.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(deleteHotlists.rejected, (state, action) => {
        console.error("Error Deleting Hotlists", action.error);
      });
  },
});

export const {
  addTool,
  removeTool,
  setMyVendor,
  setEmptySearchCompanies,
  showHotList,
  setBroadcastFilters,
} = ToolsSlice.actions;

export default ToolsSlice.reducer;
