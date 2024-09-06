import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserData = createAsyncThunk(
  "profileStore/fetchUserData",
  async ({ id, token }) => {
    try {
      const response = await axios.get(
        `https://brokerbin.shiwantek.com/api/user/fetch/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error(
        "Error while fetching user data:",
        error.response?.data || error.message
      );
      throw "Error while fetching user data:" || error;
    }
  }
);

export const submitUserData = createAsyncThunk(
  "profileStore/submitUserData",
  async ({ id, token, data }) => {
    try {
      const response = await axios.put(
        `https://brokerbin.shiwantek.com/api/user/edit/${id}`,
        JSON.stringify(data),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error(
        "Error while submitting user data:",
        error.response?.data || error.message
      );
      throw "Error while submitting user data:" || error;
    }
  }
);

export const submitUserOptions = createAsyncThunk(
  "profileStore/submitUserOptions",
  async ({ id, token, data }) => {
    try {
      const response = await axios.put(
        `https://brokerbin.shiwantek.com/api/user/edit/${id}`,
        JSON.stringify(data),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error(
        "Error while submitting user data:",
        error.response?.data || error.message
      );
      throw "Error while submitting user data:" || error;
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  formData: {
    firstName: "",
    lastName: "",
    position: "",
    experience: "",
    specialty: "",
    email: "",
    skype: "",
    whatsapp: "",
    trillian: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    phoneNumber: "",
    tollFree: "",
    cellular: "",
    faxNumber: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    profileImage: "",
    customSignature: [],
    signature: [],
    sigcheckName: true,
    sigcheckEmailAddress: true,
    sigcheckPosition: true,
    sigcheckPhone: true,
    sigcheckCell: true,
    sigcheckCompany: true,
    sigcheckToll: true,
    sigcheckFax: true,
    sigcheckIM: true,
  },
  optionFormData: {
    hourly: false,
    daily: false,
    my_regions_filter: [],
    my_countries_filter: [],
    my_states_filter: [],
    regions_filter: [],
    countries_filter: [],
    states_filter: [],
    language: "english",
    sortPreferences: [
      { sortBy: "", sortOrder: "ASC" }, // Default preferences for Sorting 1
      { sortBy: "", sortOrder: "ASC" }, // Sorting 2
      { sortBy: "", sortOrder: "ASC" }, // Sorting 3
    ],
    sortLock: "0",
    multiplePartSearch: "1",
    itemsPerPage: "20",
    alternateRowColors: false,
    showBorders: false,
    showFilters: "2",
    displayFiltersPosition: "2",
    showDetails: false,
    forceDescriptions: false,
    doubleVision: false,
    showHistoryGraphs: true,
    preferredBrokerBin: "1",
    receiveRFQEmails: "1",
    fontSize: "8",
    extendedCompanyInfo: "1",
    contactMethod: "1",
    showContactInfo: "1",
    receiveSiteEmails: "0",
    receiveUpdates: "0",
    cfilterfNEW:false,
    cfilterfASIS:false,

  },
  initialData: {},
  blurWhileLoading: false,
  customSignature: true,
  error: null,
};

const profileSlice = createSlice({
  name: "profileStore",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = {
        ...state.formData,
        ...action.payload,
      };
    },
    setOptionFormData: (state, action) => {
      state.optionFormData = {
        ...state.optionFormData,
        ...action.payload,
      };
    },
    setCustomSignature: (state, action) => {
      state.customSignature = action.payload;
    },
    setBlurWhileLoading: (state, action) => {
      state.blurWhileLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.blurWhileLoading = false;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.blurWhileLoading = true;
        state.initialData = action.payload;
        state.formData = {
          ...state.formData,
          ...action.payload,
        };
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.blurWhileLoading = true;
        state.error = action.error.message;
      })
      .addCase(submitUserData.pending, (state) => {
        state.blurWhileLoading = false;
      })
      .addCase(submitUserData.fulfilled, (state, action) => {
        state.initialData = action.payload;
        state.formData = {
          ...state.formData,
          ...action.payload,
        };
        state.blurWhileLoading = true;
      })
      .addCase(submitUserData.rejected, (state, action) => {
        console.log(action.error.message);
        state.error = action.error.message;
        state.blurWhileLoading = false;
      });
  },
});

export const {
  setFormData,
  setOptionFormData,
  setCustomSignature,
  setBlurWhileLoading,
} = profileSlice.actions;

export default profileSlice.reducer;
