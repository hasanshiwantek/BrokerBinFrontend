import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { brokerAPI } from "../components/api/BrokerEndpoint";

export const sendEthics = createAsyncThunk(
  "toolsStore/sendEthics",
  async ({ data, token }) => {
    console.log(data);
    try {
      const response = await axios.post(`${brokerAPI}ethics/store`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
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
      const response = await axios.get(`${brokerAPI}vendor/get-vendor`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
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
      const response = await axios.get(`${brokerAPI}hot-lists`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
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
      const response = await axios.delete(`${brokerAPI}hot-lists/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: { ids }, // Pass 'Ids' as part of the request body
      });
      return response.data; // Assuming the backend returns the deleted IDs or a success message
    } catch (error) {
      console.error("Error Deleting Hotlists:", error.response?.data);
      throw error.response?.data; // Propagate the error message
    }
  }
);

export const addMyContacts = createAsyncThunk(
  "toolsStore/addMyContacts",
  async ({ contact_id, token }) => {
    console.log(contact_id);

    try {
      const response = await axios.post(
        `${brokerAPI}contact/is_fav_contact`,
        { contact_id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Contact Data From Backend: ", response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message);
    }
  }
);

export const fetchMyContacts = createAsyncThunk(
  "toolsStore/fetchMyContacts",
  async ({ token }) => {
    try {
      const response = await axios.get(`${brokerAPI}contact/fvrt_contacts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Contact Data From Redux: ", response.data.data);
      return response.data.data;
    } catch (error) {
      throw new Error("Error searching Contacts Data");
    }
  }
);

export const searchMyFavouriteContacts = createAsyncThunk(
  "toolsStore/searchMyFavouriteContacts",
  async ({ search, token }) => {
    try {
      const response = await axios.post(
        `${brokerAPI}contact/search_contact`,
        { search },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Contact Data From Redux: ", response.data);
      return response.data.contacts;
    } catch (error) {
      throw new Error("Error searching company name");
    }
  }
);

export const removeMyFavouriteContacts = createAsyncThunk(
  "toolsStore/removeMyFavouriteContacts",
  async ({ contact_id, token }) => {
    console.log(contact_id);

    try {
      const response = await axios.post(
        `${brokerAPI}contact/remove_fav_contact`,
        { contact_id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Favourite contact Removed: ", response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message);
    }
  }
);

export const addMyNotes = createAsyncThunk(
  "toolsStore/addMyNotes",
  async ({ user_id, note, rating, token }) => {
    console.log(user_id, rating, note);
    try {
      const response = await axios.post(
        `${brokerAPI}notes/create`,
        { user_id, note, rating },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("User Notes: ", response.data);
      return response.data;
    } catch (error) {
      throw new Error(response?.data?.message);
    }
  }
);

export const fetchMyNotes = createAsyncThunk(
  "toolsStore/fetchMyNotes",
  async ({ token }) => {
    try {
      const response = await axios.get(`${brokerAPI}notes/note-contact`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("User Notes Fetched: ", response.data);
      return response.data;
    } catch (error) {
      throw new Error(response?.data?.message);
    }
  }
);

export const addMyVendorNotes = createAsyncThunk(
  "toolsStore/addMyVendorNotes",
  async ({ company_id, note, token }) => {
    console.log(company_id, note);

    try {
      const response = await axios.post(
        `${brokerAPI}notes/create`,
        { company_id, note },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Vendor Notes: ", response.data);
      return response.data;
    } catch (error) {
      console.error("Thunk error:", error);
      throw new Error(error?.response?.data?.message || error.message);
    }
  }
);

export const fetchMyVendorNotes = createAsyncThunk(
  "toolsStore/fetchMyVendorNotes",
  async ({ token }) => {
    try {
      const response = await axios.get(`${brokerAPI}notes/note-vendor`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Vendor Notes Fetched: ", response.data);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message || error.message);
    }
  }
);

export const fetchMyViewByContacts = createAsyncThunk(
  "toolsStore/fetchMyViewByContacts",
  async ({ sortBy, token }) => {
    try {
      const response = await axios.get(
        `${brokerAPI}contact/fvrt_contacts?sortBy=${sortBy}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("View By Contact Data From Redux: ", response.data.data);
      return response.data.data;
    } catch (error) {
      throw new Error("Error searching Contacts Data");
    }
  }
);

export const fetchMyViewByVendors = createAsyncThunk(
  "toolsStore/fetchMyViewByVendors",
  async ({ sortBy, token }) => {
    try {
      const response = await axios.get(
        `${brokerAPI}vendor/get-vendor?sortBy=${sortBy}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("View By Vendor Data From Redux: ", response.data.data);
      return response.data.data;
    } catch (error) {
      throw new Error("Error searching Vendor Data");
    }
  }
);

export const blockMyVendor = createAsyncThunk(
  "toolsStore/blockMyVendor",
  async ({ company_id, status, token }) => {
    console.log(company_id, status);
    try {
      const response = await axios.post(
        `${brokerAPI}vendorblock/vendor-block`,
        { company_id, status },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Vendor Blocked Succesfully: ", response.data);
      return response.data;
    } catch (error) {
      throw new Error(response?.data?.message);
    }
  }
);

export const showFirstVendor = createAsyncThunk(
  "toolsStore/showFirstVendor",
  async ({ company_id, show_first, token }) => {
    console.log(company_id, show_first);
    try {
      const response = await axios.post(
        `${brokerAPI}companyshow/show-firstCompany`,
        { company_id, show_first },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Company Show First Response from Backend: ", response.data);
      return response.data;
    } catch (error) {
      throw new Error(response?.data?.message);
    }
  }
);

export const neverShowVendor = createAsyncThunk(
  "toolsStore/neverShowVendor",
  async ({ company_id, never_show, token }) => {
    console.log(company_id, never_show);
    try {
      const response = await axios.post(
        `${brokerAPI}companyshow/never-showCompany`,
        { company_id, never_show },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Never Company Show  Response from Backend: ", response.data);
      return response.data;
    } catch (error) {
      throw new Error(response?.data?.message);
    }
  }
);

export const showFirstNeverShowCount = createAsyncThunk(
  "toolsStore/showFirstNeverShowCount",
  async ({ id, token }) => {
    try {
      const response = await axios.get(
        `${brokerAPI}companyshow/company-visibility-count/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("View By Vendor Data From Redux: ", response.data);
      return response.data;
    } catch (error) {
      throw new Error("Error searching Vendor Data");
    }
  }
);

const initialState = {
  tools: [],
  searchCompanies: [],
  searchMyVendor: [],
  myVendor: [],
  
  myHotListItems: [],
  myContactsData: [],
  searchMyContact: [],
  noteData: [],
  vendorNoteData: [],
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
    setEmptySearchContacts(state, action) {
      state.searchMyContact = [];
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
      .addCase(fetchMyViewByVendors.pending, (state) => {
        console.log("PENDINGGGG...");
        state.loading = true;
      })
      .addCase(fetchMyViewByVendors.fulfilled, (state, action) => {
        state.myVendor = action.payload;
        state.loading = false;
      })
      .addCase(fetchMyViewByVendors.rejected, (state, action) => {
        console.error("Error Fetching  company View By", action.error);
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
      })
      .addCase(addMyContacts.pending, (state) => {
        console.log("ADDING CONTACTS....");
      })
      .addCase(addMyContacts.fulfilled, (state, action) => {
        // state.myContactsData = action.payload;
        console.log("REQUEST FULFILLED: ", action.payload);
      })
      .addCase(addMyContacts.rejected, (state, action) => {
        console.error("Error Sumbitting Contacts Data", action.error);
      })
      .addCase(fetchMyContacts.pending, (state) => {
        console.log("FETCHIG  CONTACTS....");
      })
      .addCase(fetchMyContacts.fulfilled, (state, action) => {
        state.myContactsData = action.payload;
        console.log("REQUEST FULFILLED: ", action.payload);
      })
      .addCase(fetchMyContacts.rejected, (state, action) => {
        console.error("Error Fetching Contact Data", action.error);
      })
      .addCase(fetchMyViewByContacts.pending, (state) => {
        console.log("FETCHIG VIEW BY CONTACTS....");
      })
      .addCase(fetchMyViewByContacts.fulfilled, (state, action) => {
        state.myContactsData = action.payload;
        console.log("REQUEST FULFILLED: ", action.payload);
      })
      .addCase(fetchMyViewByContacts.rejected, (state, action) => {
        console.error("Error Fetching ViewBy Contact Data", action.error);
      })
      .addCase(searchMyFavouriteContacts.pending, (state) => {
        console.log("SEARCHING  CONTACTS....");
      })
      .addCase(searchMyFavouriteContacts.fulfilled, (state, action) => {
        state.searchMyContact = action.payload;
        console.log("REQUEST FULFILLED: ", action.payload);
      })
      .addCase(searchMyFavouriteContacts.rejected, (state, action) => {
        console.error("Error Fetching Search Contact Data", action.error);
      })
      .addCase(removeMyFavouriteContacts.pending, (state) => {
        console.log("Searching...");
        state.loading = true;
      })
      .addCase(removeMyFavouriteContacts.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.myContactsData = state.myContactsData.filter(
          (contact) => contact.contact?.id !== action.payload.data?.contact?.id
        ); // Immediately remove the vendor
      })
      .addCase(removeMyFavouriteContacts.rejected, (state, action) => {
        console.error("Error Removing Contact", action.error);
        state.loading = true;
      })
      .addCase(fetchMyNotes.pending, (state) => {
        console.log("FETCHING  NOTES....");
      })
      .addCase(fetchMyNotes.fulfilled, (state, action) => {
        state.noteData = action.payload;
        console.log("REQUEST FULFILLED: ", action.payload);
      })
      .addCase(fetchMyNotes.rejected, (state, action) => {
        console.error("Error Fetching Notes", action.error);
      })
      .addCase(fetchMyVendorNotes.pending, (state) => {
        console.log("FETCHING  NOTES....");
      })
      .addCase(fetchMyVendorNotes.fulfilled, (state, action) => {
        state.vendorNoteData = action.payload;
        console.log("REQUEST FULFILLED: ", action.payload);
      })
      .addCase(fetchMyVendorNotes.rejected, (state, action) => {
        console.error("Error Fetching Notes", action.error);
      })
      .addCase(showFirstVendor.pending, (state) => {
        console.log("⏳ Upload Pending");
      })
      .addCase(showFirstVendor.fulfilled, (state, action) => {
        console.log("✅ Upload Success Payload:", action.payload);
      })
      .addCase(showFirstVendor.rejected, (state, action) => {
        console.error("❌ Upload Rejected:", action.payload);
      })
      .addCase(neverShowVendor.pending, (state) => {
        console.log("⏳ Upload Pending");
      })
      .addCase(neverShowVendor.fulfilled, (state, action) => {
        console.log("✅ Upload Success Payload:", action.payload);
      })
      .addCase(neverShowVendor.rejected, (state, action) => {
        console.error("❌ Upload Rejected:", action.payload);
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
  setEmptySearchContacts,
} = ToolsSlice.actions;

export default ToolsSlice.reducer;
