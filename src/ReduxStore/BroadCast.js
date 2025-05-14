import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { brokerAPI } from "../components/api/BrokerEndpoint";

export const sendBroadcast = createAsyncThunk(
  "broadcastStore/sendBroadcast",
  async ({ token, data }) => {
    try {
      // Log data to check what is being sent
      console.log("Sending data:", data);

      const response = await axios.post(
        `${brokerAPI}broadcast/store`,
        data, // Assuming 'data' is correctly formatted for 'multipart/form-data'
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error while fetching user data:",
        error.response?.data || error.message
      );
      throw new Error("Error while sending broadcast: " + (error.response?.data || error.message));
    }
  }
);

export const broadCastFilters = createAsyncThunk(
  "broadcastStore/broadCastFilters",
  async ({ data, token }) => {
    console.log({ data })

    try {
      const response = await axios.post(
        `${brokerAPI}bfilters/store`,
        data,


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
      console.error(
        "Error while fetching user data:",
        error.response?.data || error.message
      );
      throw "Error while sending broadcast:" || error;
    }
  }
);

export const fetchBroadCastFilters = createAsyncThunk(
  "broadcastStore/fetchBroadCastFilters",
  async ({ token }) => {
    console.log(token)

    try {
      const response = await axios.get(
        `${brokerAPI}bfilters/show`,
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
      throw new Error("Error searching User");
    }
  }
);

export const fetchBroadCastData = createAsyncThunk(
  "broadcastStore/fetchBroadCastData",
  async ({ token, pageNumber = 1 }) => {
    console.log("API Request Page Number:", pageNumber); // Debugging
    try {
      const response = await axios.get(
        `${brokerAPI}broadcast?pageNumber=${pageNumber}`, // Ensure pageNumber is used here
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("API Response:", response.data); // Debugging
      return response.data;
    } catch (error) {
      console.error("Error fetching broadcasts:", error); // Debugging
      throw new Error("Error fetching broadcasts");
    }
  }
);

export const deleteBroadCastData = createAsyncThunk(
  "broadcastStore/deleteBroadCastData",
  async ({ token, ids }) => {
    console.log(token, "Attempting to delete broadcasts with IDs:", ids);

    try {
      const response = await axios.delete(
        `${brokerAPI}broadcast/delete`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: { ids } // Pass 'ids' as part of the request body
        }
      );

      console.log("Broadcast Deleted", response.data);

      return ids; // Return the deleted IDs to update the state

    } catch (error) {
      console.error("Error deleting Broadcast Data", error.response?.data || error.message);
      throw new Error("Error deleting Broadcast Data: " + (error.response?.data || error.message));
    }
  }
);

export const sendBroadcastReply = createAsyncThunk(
  "broadcastStore/sendBroadcastReply",
  async ({ token, data }) => {
    try {
      // Log data to check what is being sent
      console.log("Sending data:", data);

      const response = await axios.post(
        `${brokerAPI}broadcast/email-reply`,
        data, // Assuming 'data' is correctly formatted for 'multipart/form-data'
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("API Response:", response.data); // Debugging
      return response.data;
    } catch (error) {
      console.error(
        "Error while fetching user data:",
        error.response?.data || error.message
      );
      throw new Error("Error while sending broadcast Reply: " + (error.response?.data || error.message));
    }
  }
);

export const fetchBroadCastCount = createAsyncThunk(
  "broadcastStore/fetchBroadCastCount",
  async ({ token }) => {
    console.log(token)

    try {
      const response = await axios.get(
        `${brokerAPI}broadcast/count`,
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
      throw new Error("Error fetching broadcast count");
    }
  }
);

export const filterBroadCastPartModel = createAsyncThunk(
  "broadcastStore/filterBroadCastPartModel",
  async ({ token,partModel }) => {
    console.log(token)

    try {
      const response = await axios.get(
        `${brokerAPI}broadcast/filter?search=${partModel}`,
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
      throw new Error("Error fetching broadcast count");
    }
  }
);

const initialState = {
  computerSelection: [],
  telecomSelection: [],
  mobileDevicesSelection: [],
  companiesSelection: [],
  regionSelection: [],
  filters: [],
  broadCastData: [],
  serviceData: [],
  selectedCompanyNames:[],
  broadcastCount:{},
  filterBroadcastPartModelData:{},
  togglePopUp: false,
  popupCompanyDetail: null,
};

const broadcastSlice = createSlice({
  name: "broadcastStore",
  initialState,
  reducers: {
    setComputerSelection: (state, action) => {
      state.computerSelection = action.payload;
    },
    setTelecomSelection: (state, action) => {
      state.telecomSelection = action.payload;
    },
    setMobileDevicesSelection: (state, action) => {
      state.mobileDevicesSelection = action.payload;
    },
    setCompaniesSelection: (state, action) => {
      state.companiesSelection = action.payload;
    },
    setRegionSelection: (state, action) => {
      state.regionSelection = action.payload;
    },
    setServiceSelection: (state, action) => {
      const index = state.serviceData.indexOf(action.payload);
      if (index > -1) {
        // Service is already selected, remove it
        state.serviceData.splice(index, 1);
      } else {
        // Service is not selected, add it
        state.serviceData.push(action.payload);
      }
    },
    setSelectedCompanyNames: (state, action) => {
      state.selectedCompanyNames = action.payload;
    },

    setTogglePopUp: (state) => {
      state.togglePopUp = !state.togglePopUp;
    },
    setPopupCompanyDetail: (state, action) => {
      state.popupCompanyDetail = action.payload;
    },
    clearAllSelections: (state) => {
      // Reset all related fields
      state.computerSelection = [];
      state.telecomSelection = [];
      state.mobileDevicesSelection = [];
      state.companiesSelection = [];
      state.regionSelection = [];
      state.serviceData = [];
      state.selectedCompanyNames=[];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(broadCastFilters.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(broadCastFilters.fulfilled, (state, action) => {
        state.isLoading = false;
        // Optionally update state with the result
        // state.filters = action.payload;

      })
      .addCase(broadCastFilters.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchBroadCastFilters.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBroadCastFilters.fulfilled, (state, action) => {
        state.isLoading = false;
        //Update state with the result
        state.filters = action.payload;
      })
      .addCase(fetchBroadCastFilters.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchBroadCastData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBroadCastData.fulfilled, (state, action) => {
        state.isLoading = false;
        //Update state with the result
        state.broadCastData = action.payload;
      })
      .addCase(fetchBroadCastData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteBroadCastData.pending, (state) => {
        state.isLoading = true;
        console.log("Pending... ")
        state.error = null;
      })
      .addCase(deleteBroadCastData.fulfilled, (state, action) => {
        state.isLoading = false;
        if (Array.isArray(state.broadCastData)) {
          // Filter out deleted items based on the payload of deleted IDs
          const filteredData = state.broadCastData.filter(broadcast => !action.payload.includes(broadcast.id));
          state.broadCastData = filteredData;
        } else {
          console.error("broadCastData is not an array:", state.broadCastData);
          state.broadCastData = []; // Reset it to an empty array to avoid further issues
        }
      })
      .addCase(deleteBroadCastData.rejected, (state, action) => {
        state.isLoading = false;
        console.log("REJECTED!!!... ")
        state.error = action.error.message;
      }).addCase(sendBroadcastReply.pending, (state) => {
        state.isLoading = true;
        console.log("Pending... ")
        state.error = null;
      })
      .addCase(sendBroadcastReply.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("REPLY FULLFILLED")

      })
      .addCase(sendBroadcastReply.rejected, (state, action) => {
        state.isLoading = false;
        console.log("REJECTED!!!... ")
        state.error = action.error.message;
      })
      .addCase(fetchBroadCastCount.pending, (state) => {
        state.isLoading = true;
        console.log("Pending... ")
        state.error = null;
      })
      .addCase(fetchBroadCastCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.broadcastCount=action.payload
      })
      .addCase(fetchBroadCastCount.rejected, (state, action) => {
        state.isLoading = false;
        console.log("REJECTED!!!... ")
        state.error = action.error.message;
      })
      .addCase(filterBroadCastPartModel.pending, (state) => {
        state.isLoading = true;
        console.log("Pending... ")
        state.error = null;
      })
      .addCase(filterBroadCastPartModel.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("Filtered PartModels from Redux ",action.payload)
        state.filterBroadcastPartModelData=action.payload
      })
      .addCase(filterBroadCastPartModel.rejected, (state, action) => {
        state.isLoading = false;
        console.log("REJECTED!!!... ")
        state.error = action.error.message;
      });
      
      
  },
});

export const {
  setComputerSelection,
  setTelecomSelection,
  setMobileDevicesSelection,
  setCompaniesSelection,
  setRegionSelection,
  setServiceSelection,
  setFormData,
  setTogglePopUp,
  clearAllSelections,
  setPopupCompanyDetail,
  setSelectedCompanyNames,
} = broadcastSlice.actions;

export default broadcastSlice.reducer;