import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { brokerAPI } from "../components/api/BrokerEndpoint";
import axios from "axios";

export const addRecipients = createAsyncThunk(
  "rfqStore/addRecipients",
  async ({ token, search }) => {
    console.log(search);
    try {
      const response = await axios.get(
        `${brokerAPI}user/search-user?query=${search}`,
        // { search }, //Get request doesn't have body.
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
        "Error while searching user:",
        error.response?.data || error.message
      );
      throw error.response?.data || error.message;
    }
  }
);


export const searchProductQuery = createAsyncThunk(
  "rfqstore/searchProductQuery",
  async ({ token, page, search }) => {
    console.log("Part Search" + search);
    try {
      const response = await axios.post(
        `${brokerAPI}inventory/search/rfq`,
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


export const submitRfq = createAsyncThunk(
  "searchProductStore/submitRfq ",
  async ({ token, data }) => {
    try {
      // Log data to check what is being sent
      console.log("Sending RFQ data:", data);

      const response = await axios.post(
        `${brokerAPI}inventory/rfq`,
        data, // Assuming 'data' is correctly formatted for 'multipart/form-data'
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Formdata from backend",response.data)
      return response.data;
    } catch (error) {
      console.error(
        "Error submitting RFQ data:",
        error.response?.data || error.message
      );
      throw new Error("Error while sending broadcast: " + (error.response?.data || error.message));
    }
  }
);



export const receivedRfq = createAsyncThunk(
  "searchProductStore/receivedRfq",
  async ({ token,page }) => {
    console.log("Token:", token);

    try {
      const response = await axios.get(
        `${brokerAPI}rfq/received?page=${page}`, 
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,  // Token passed correctly in headers
          },
        }
      );

      console.log("RFQ from backend", response.data);
      return response.data;
    } catch (error) {
      console.error("Error Fetching RFQ received data:", error.response?.data || error.message);
      throw new Error("Error while sending broadcast: " + (error.response?.data || error.message));
    }
  }
);


export const sentRfq = createAsyncThunk(
  "searchProductStore/sentRfq",
  async ({ token,page }) => {
    console.log("Token:", token);

    try {
      const response = await axios.get(
        `${brokerAPI}rfq/sent?page=${page}`, 
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,  // Token passed correctly in headers
          },
        }
      );

      console.log("Sent RFQ from backend", response.data);
      return response.data;
    } catch (error) {
      console.error("Error Fetching RFQ Sent data:", error.response?.data || error.message);
    }
  }
);



export const getRfqArchived = createAsyncThunk(
  "searchProductStore/getRfqArchived",
  async ({ token,page }) => {
    console.log("Token:", token);

    try {
      const response = await axios.get(
        `${brokerAPI}rfq/archived?page=${page}`, 
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,  // Token passed correctly in headers
          },
        }
      );

      console.log(" RFQ Archive from backend", response.data);
      return response.data;
    } catch (error) {
      console.error("Error Fetching RFQ Archive data:", error.response?.data || error.message);
    }
  }
);





export const deleteArchiveRfq = createAsyncThunk(
  "inventoryStore/deleteArchiveRfq ",
  async ({ token, ids }) => {
    console.log(token, "Attempting to delete RFQs with IDs:", ids);
    try {
      const response = await axios.delete(
        `${brokerAPI}rfq/delete`,
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
      console.error("Error Deleting RFQS:", error.response?.data);
      throw error.response?.data; // Propagate the error message
    }
  }
);







export const deleteCompanyUser = createAsyncThunk(
  "deleteCompanyUser/submitRfq",
  async ({ token, id }) => {
    try {
      const response = await axios.put(
        `${brokerAPI}user/remove-user/${id}`, // Correct URL
        { id }, // Pass the ID in the body of the request, not just as a URL parameter
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("User deleted From Backend", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error Deleting Company User:",
        error.response?.data || error.message
      );
      throw new Error("Error Deleting Company User: " + (error.response?.data || error.message));
    }
  }
);

export const statusRfq = createAsyncThunk(
  "rfqStore/statusRfq",
  async ({ token, data }) => {
    try {
      console.log("Sending status RFQ data:", data);

      const response = await axios.post(
        `${brokerAPI}rfq/status`,
        data, 
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      console.log("Response from backend:", response.data);

      // Return the response data
      return response.data;
    } catch (error) {
      // Log any errors for debugging
      console.error(
        "Error submitting RFQ status:",
        error.response?.data || error.message
      );

      // Throw an error for Redux to handle
      throw new Error(
        "Error while updating RFQ status: " +
          (error.response?.data?.message || error.message)
      );
    }
  }
);










const initialState = {
  togglePopUp: false,
  rfqMailCheckAll: false,
  currentPage: 1,
  rfqPopBoxInfo: [],
  rfqMail: [],
  searchResults: [],
  searchResponseMatched: [],
  receiveRfqData:[],
  sentRfqData:[],
  rfqArchiveData:[],
};

const RfqSlice = createSlice({
  name: "rfqStore",
  initialState,
  reducers: {
    setTogglePopUp: (state, action) => {
      state.togglePopUp = !state.togglePopUp;
    },
    setRfqPopBoxInfo: (state, { payload }) => {
      state.rfqPopBoxInfo = payload;
    },
    
    setRfqMail: (state, { payload }) => {
      state.rfqMail = payload;
    },
    setRfqMailCheckAll: (state, { payload }) => {
      state.rfqMailCheckAll = payload;
    },
    setCurrentPagePrev: (state, action) => {
      state.currentPage -= 1;
    },
    setCurrentPageNext: (state, action) => {
      state.currentPage += 1;
    },
    clearSearchResults(state) {
      state.searchResults = []; // Reset searchResults to an empty array
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addRecipients.pending, (state) => {
        console.log("Pending API Call: Clearing Results");
        state.searchResults = []; // Clear previous results
      })
      .addCase(addRecipients.fulfilled, (state, action) => {
        console.log("API Response:", action.payload); // Log the response
        state.searchResults = action.payload || []; // Update searchResults
        console.log("Redux State After Update:", state.searchResults);
      })
      .addCase(addRecipients.rejected, (state) => {
        console.error("API Call Rejected:", action.error);
        state.searchResults = []; // Handle error, if needed
      })
      .addCase(submitRfq.pending, (state) => {
        console.log("Pending API Call");
      })
      .addCase(submitRfq .fulfilled, (state, action) => {
        console.log("API Response:", action.payload); // Log the response
      })
      .addCase(submitRfq.rejected, (state) => {
        console.error("API Call Rejected:", action.error);
      })
      .addCase(searchProductQuery.pending, (state) => {
        state.gettingProducts = true; // Set to true when starting the fetch
        state.error = null;
      })
      .addCase(searchProductQuery.fulfilled, (state, action) => {
        // console.log('SEARCH RESULTS', action.payload);
        state.searchResponseMatched = action.payload.data;
        // state.searchResponseNotMatched = action.payload.notFoundKeywords;
        state.totalCount = action.payload.totalCount;
        state.gettingProducts = false; // Set to false after fetching is done
      })
      .addCase(searchProductQuery.rejected, (state, action) => {
        state.error = action.error.message;
        console.error("Error while searching:", action.error.message);
        state.gettingProducts = false; // Set to false if the fetch fails
      })
      .addCase(receivedRfq.pending, (state) => {
        console.log("Pending....")
      })
      .addCase(receivedRfq.fulfilled, (state, action) => {
        state.receiveRfqData=action.payload
        console.log("PAYLOAD "+ action.payload)

      })
      .addCase(receivedRfq.rejected, (state, action) => {
        console.error("Error while Fetching Received Data");
      })
      .addCase(sentRfq.pending, (state) => {
        // console.log("Pending....")
      })
      .addCase(sentRfq.fulfilled, (state, action) => {
        state.sentRfqData =action.payload
        console.log("PAYLOAD "+ action.payload)

      })
      .addCase(sentRfq.rejected, (state, action) => {
        console.error("Error while Fetching Sent Data");
      })
      .addCase(statusRfq.pending, (state) => {
        console.log("Updating RFQ status..."); // Log for debugging
      })
      .addCase(statusRfq.fulfilled, (state, action) => {
        console.log("RFQ status updated:", action.payload); // Log the response
        // Optionally update state based on action.payload
      })
      .addCase(statusRfq.rejected, (state, action) => {
        console.error("Failed to update RFQ status:", action.error.message);
        // Handle error if necessary
      })
      .addCase(getRfqArchived.pending, (state) => {
        console.log("Pending....")
      })
      .addCase(getRfqArchived.fulfilled, (state, action) => {
        state.rfqArchiveData =action.payload
        console.log("PAYLOAD "+ action.payload)

      })
      .addCase(getRfqArchived.rejected, (state, action) => {
        console.error("Error while Fetching Archive Data");
      })

  },
  
});

export const {
  setTogglePopUp,
  setRfqPopBoxInfo,
  setRfqMail,
  setRfqMailCheckAll,
  setCurrentPagePrev,
  setCurrentPageNext,
  clearSearchResults,
} = RfqSlice.actions;

export default RfqSlice.reducer;
