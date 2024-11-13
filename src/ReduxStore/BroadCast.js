import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { brokerAPI } from "../components/api/BrokerEndpoint";
// export const sendBroadcast = createAsyncThunk(
//   "broadcastStore/sendBroadcast",
//   async ({ token, data }) => {
//     try {
//       const response = await axios.post(
//         "https://brokerbin.shiwantek.com/api/broadcast/store",
//         data,
//         console.log(data),
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       return response.data;
//     } catch (error) {
//       console.error(
//         "Error while fetching user data:",
//         error.response?.data || error.message
//       );
//       throw "Error while sending broadcast:" || error;
//     }
//   }
// );

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
  async ({ token }) => {
    console.log(token)

    try {
      const response = await axios.get(
        `${brokerAPI}broadcast`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("View Broadcast Data",response.data);

      return response.data;

    } catch (error) {
      throw new Error("Error searching User");
    }
  }
);

<<<<<<< HEAD
export const deleteBroadCastData = createAsyncThunk(
  "broadcastStore/deleteBroadCastData",
  async ({ token, ids }) => {
    console.log(token);
=======



// export const deleteBroadCastData = createAsyncThunk(
//   "broadcastStore/deleteBroadCastData",
//   async ({ token,ids }) => {
//     console.log(token)

//     try {
//       const response = await axios.delete(
//         `${brokerAPI}broadcast/delete${ids}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("Broadcast Deleted",response.data);

//       return id;

//     } catch (error) {
//       throw new Error("Error deleting Broadcast Data");
//     }
//   }
// );




export const deleteBroadCastData = createAsyncThunk(
  "broadcastStore/deleteBroadCastData",
  async ({ token, ids }) => {
    console.log(token, "Attempting to delete broadcasts with IDs:", ids);
>>>>>>> 94752b03858014e259dc5dad430eed4254aeef07

    try {
      const response = await axios.delete(
        `${brokerAPI}broadcast/delete`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
<<<<<<< HEAD
          data: { ids },
        }
      );

      console.log("Deleted Broadcast Data", response.data);

      return response.data;

    } catch (error) {
      throw new Error("Error deleting Broadcast");
=======
          data: { ids } // Pass 'ids' as part of the request body
        }
      );

      console.log("Broadcast Deleted", response.data);

      return ids; // Return the deleted IDs to update the state

    } catch (error) {
      console.error("Error deleting Broadcast Data", error.response?.data || error.message);
      throw new Error("Error deleting Broadcast Data: " + (error.response?.data || error.message));
>>>>>>> 94752b03858014e259dc5dad430eed4254aeef07
    }
  }
);


<<<<<<< HEAD
=======

>>>>>>> 94752b03858014e259dc5dad430eed4254aeef07
const initialState = {
  computerSelection: [],
  telecomSelection: [],
  mobileDevicesSelection: [],
  companiesSelection: [],
  regionSelection: [],
  filters: [],
  broadCastData: [],
  serviceData: [],
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

    setTogglePopUp: (state) => {
      state.togglePopUp = !state.togglePopUp;
    },
    setPopupCompanyDetail: (state, action) => {
      state.popupCompanyDetail = action.payload;
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
<<<<<<< HEAD
=======
        console.log("Pending... ")
>>>>>>> 94752b03858014e259dc5dad430eed4254aeef07
        state.error = null;
      })
      // .addCase(deleteBroadCastData.fulfilled, (state, action) => {
      //   state.isLoading = false;
<<<<<<< HEAD
      //   //Update state with the result
      //   state.broadCastData = action.payload;
      // })
      // .addCase(deleteBroadCastData.fulfilled, (state, action) => {
      //   state.isLoading = false;
      
      //   const deletedIds = action.meta.arg.ids; // Get the IDs that were sent for deletion
      
      //   // Filter out the deleted broadcasts without replacing broadCastData with action.payload
      //   if (Array.isArray(state.broadCastData)) {
      //     state.broadCastData = state.broadCastData.filter(
      //       (item) => !deletedIds.includes(item.id)
      //     );
      //   } else {
      //     console.error("Expected broadCastData to be an array, got:", state.broadCastData);
      //   }
      // })

      // .addCase(deleteBroadCastData.fulfilled, (state, action) => {
      //   state.isLoading = false;
      
      //   // Confirm that deletedIds is coming from meta or payload as a fallback
      //   const deletedIds = action.meta.arg?.ids || action.payload?.deletedIds;
        
      //   // Logging for troubleshooting
      //   console.log("Deleted IDs:", deletedIds);
      //   console.log("Current broadcast data:", state.broadCastData);
      
      //   // Ensure both deletedIds and broadCastData are arrays before proceeding
      //   if (Array.isArray(state.broadCastData) && Array.isArray(deletedIds)) {
      //     // Create a shallow copy and filter it
      //     const updatedBroadcasts = state.broadCastData.slice().filter(
      //       (item) => !deletedIds.includes(item.id)
      //     );
      
      //     // Assign the filtered copy back to state.broadCastData
      //     state.broadCastData = updatedBroadcasts;
      //   } else {
      //     console.error("Expected broadCastData to be an array, got:", state.broadCastData);
      //     console.error("Expected deletedIds to be an array, got:", deletedIds);
      //   }
      // })
      
      .addCase(deleteBroadCastData.fulfilled, (state, action) => {
        state.isLoading = false;
      
        // Extract deleted IDs safely from either meta or payload
        const deletedIds = action.meta.arg?.ids || action.payload?.deletedIds;
      
        // Logging for clarity
        console.log("Deleted IDs:", deletedIds);
        console.log("Current broadcast data:", state.broadCastData);
      
        // Force broadCastData to be an array if it's not
        if (!Array.isArray(state.broadCastData)) {
          state.broadCastData = [];
        }
      
        // Proceed only if both are arrays
        if (Array.isArray(deletedIds)) {
          // Create a filtered array without mutating state directly
          const updatedBroadcasts = (state.broadCastData || []).filter(
            (item) => !deletedIds.includes(item.id)
          );
      
          // Update broadCastData immutably
          state.broadCastData = updatedBroadcasts;
        } else {
          console.error("Expected deletedIds to be an array, got:", deletedIds);
        }
      })
      
      
      .addCase(deleteBroadCastData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
   
=======
      //   const filteredData = state.broadCastData.filter(broadcast => !action.payload.includes(broadcast.id));
      //   console.log('Filtered Data:', filteredData);
      //   state.broadCastData = filteredData;
      // })
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
      });
>>>>>>> 94752b03858014e259dc5dad430eed4254aeef07
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
  setPopupCompanyDetail
} = broadcastSlice.actions;

export default broadcastSlice.reducer;
