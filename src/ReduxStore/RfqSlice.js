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



const initialState = {
  togglePopUp: false,
  rfqMailCheckAll: false,
  currentPage: 1,
  rfqPopBoxInfo: [],
  rfqMail: [],
  searchResults: [],
  searchResponseMatched: [],
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
