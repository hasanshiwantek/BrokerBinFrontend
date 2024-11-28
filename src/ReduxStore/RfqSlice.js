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

const initialState = {
  togglePopUp: false,
  rfqMailCheckAll: false,
  currentPage: 1,
  rfqPopBoxInfo: [],
  rfqMail: [],
  searchResults: [],
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
      });
  },
  
});

export const {
  setTogglePopUp,
  setRfqPopBoxInfo,
  setRfqMail,
  setRfqMailCheckAll,
  setCurrentPagePrev,
  setCurrentPageNext,
} = RfqSlice.actions;

export default RfqSlice.reducer;
