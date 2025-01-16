import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { brokerAPI } from "../components/api/BrokerEndpoint";

export const fetchUserData = createAsyncThunk(
  "profileStore/fetchUserData",
  async ({ id, token }) => {
    try {
      const response = await axios.get(
        `${brokerAPI}user/fetch/${id}`,
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
      const isFormData = data.formData instanceof FormData;
      const response = await axios.post(
        `${brokerAPI}user/edit/${id}`,
        isFormData ? data.formData : JSON.stringify(data.plainData),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": isFormData ? "multipart/form-data" : "application/json",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error(
        "Error while submitting user data:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
);

export const submitUserOptions = createAsyncThunk(
  "profileStore/submitUserOptions",
  async ({ id, token, data }) => {
    try {
      const response = await axios.put(
        `${brokerAPI}user/edit/${id}`,
        JSON.stringify(data),
        console.log(data),
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

export const submitUserSearch = createAsyncThunk(
  "profileStore/submitUserSearch",
  async ({ data, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${brokerAPI}user/search`,
        {data},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Search response data from front-end:", response.data);
      
      return response.data.data;
    } catch (error) {
      console.error("Request failed with error from front-end:", error);
      return rejectWithValue(error.toString());
    }
  }
);

export const submitCompanyLogo = createAsyncThunk(
  'profile/submitCompanyLogo',
  async ({ token, file }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('image', file);  // append the file to the form data

      const response = await axios.post(`${brokerAPI}company/logo`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Logo Response From Backend ",response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
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
    imScreenNames: {
      skype: '',
      whatsapp: '',
      trillian: '',
  },
  socialNetworking: {
    facebook: '',
    linkedin: '',
},
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
  searchUserData:[],
  companyLogo: null,
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
      console.log(action.payload)
    },
    setCustomSignature: (state, action) => {
      state.customSignature = action.payload;
    },
    setBlurWhileLoading: (state, action) => {
      state.blurWhileLoading = action.payload;
    },
    resetProfileState: (state) => {
      state.user = null;
      state.formData = initialState.formData;
      state.optionFormData = initialState.optionFormData;
      // Add any other state reset logic here
    },
    clearLogo:(state)=>{
      state.companyLogo=null

    }
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
        console.log("Data from front-end:", action.payload);
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
      })
      .addCase(submitUserSearch.pending, (state) => {
        state.blurWhileLoading = false;
        console.log("Pending....");
        
      })
      .addCase(submitUserSearch.fulfilled, (state, action) => {
        // state.searchUserData = action.payload,
        state.blurWhileLoading = true;
        state.searchUserData=action.payload
        console.log("Fulfilled....");

      })
      .addCase(submitUserSearch.rejected, (state, action) => {
        console.log(action.error.message);
        state.error = action.error.message;
        state.blurWhileLoading = false;
      })

      .addCase(submitUserOptions.pending, (state) => {
        state.blurWhileLoading = false;
        console.log("Pending....");
        
      })
      .addCase(submitUserOptions.fulfilled, (state, action) => {
        state.blurWhileLoading = true;
        // state.searchUserData=action.payload
        console.log("Fulfilled....");

      })
      .addCase(submitUserOptions.rejected, (state, action) => {
        console.log(action.error.message);
        state.error = action.error.message;
        state.blurWhileLoading = false;
      })
      .addCase(submitCompanyLogo.pending, (state) => {
        state.blurWhileLoading = false;
        console.log("Pending....");
      })
      .addCase(submitCompanyLogo.fulfilled, (state, action) => {
        state.blurWhileLoading = true;
        state.companyLogo = action.payload;
        console.log("Fulfilled....");
      })
      .addCase(submitCompanyLogo.rejected, (state, action) => {
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
  resetProfileState,
  clearLogo
} = profileSlice.actions;

export default profileSlice.reducer;