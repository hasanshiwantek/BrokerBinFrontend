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





const initialState = {
  computerSelection: [],
  telecomSelection: [],
  mobileDevicesSelection: [],
  companiesSelection: [],
  regionSelection: [],
  filters: [],
  broadCastData: [],
  serviceData: [],
 



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
} = broadcastSlice.actions;

export default broadcastSlice.reducer;
