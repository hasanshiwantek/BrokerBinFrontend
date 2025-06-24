import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { brokerAPI } from "../components/api/BrokerEndpoint";

export const fetchUserData = createAsyncThunk(
  "profileStore/fetchUserData",
  async ({ id, token }) => {
    try {
      const response = await axios.get(`${brokerAPI}user/fetch/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("User Data Fetched: ", response.data.data);
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
            "Content-Type": isFormData
              ? "multipart/form-data"
              : "application/json",
          },
        }
      );
      const responseData = {
        data: response.data.data,
        status: response.status,
        message: response.data.message || "Update successful",
      };

      console.log("✅ Redux Thunk Response:", responseData);
      return responseData; // return all 3 fields
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
        { data },
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
  "profile/submitCompanyLogo",
  async ({ token, file }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("image", file); // append the file to the form data

      const response = await axios.post(`${brokerAPI}company/logo`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Logo Response From Backend ", response.data);
      return {
        status: true,
        image: response?.data?.data || null, // ensure image URL is extracted correctly
      };
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

export const getCompanyFeedback = createAsyncThunk(
  "profileStore/getCompanyFeedback",
  async ({ id, token }) => {
    try {
      const response = await axios.get(`${brokerAPI}feedback/company/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Company Feedback Data from backend:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error while fetching company feedback data:",
        error.response?.data || error.message
      );
      throw "Error while fetching user data:" || error;
    }
  }
);

export const fetchGivenFeedback = createAsyncThunk(
  "profileStore/fetchGivenFeedback",
  async ({ company_id, token }) => {
    try {
      const response = await axios.get(
        `${brokerAPI}feedback/user-feedbacks?company_id=${company_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Given Company Feedback Data from backend:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error while fetching company feedback data:",
        error.response?.data || error.message
      );
      throw "Error while fetching user Given Feedback data:" || error;
    }
  }
);

export const removeReceiveFeedback = createAsyncThunk(
  "toolsStore/removeReceiveFeedback",
  async ({ feedbackId, primaryContact, token }) => {
    console.log(feedbackId, primaryContact);
    try {
      const response = await axios.delete(
        `${brokerAPI}feedback/delete-feedback`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: { feedbackId, primaryContact },
        }
      );
      console.log("Feedback Removed: ", response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message);
    }
  }
);

export const submitUserSearchViewBy = createAsyncThunk(
  "profileStore/submitUserSearchViewBy",
  async ({ sortBy, sortOrder, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${brokerAPI}user/search`,
        { sortBy, sortOrder },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(
        "Search response View By data from front-end:",
        response.data
      );

      return response.data.data;
    } catch (error) {
      console.error("Request failed with error from front-end:", error);
      return rejectWithValue(error.toString());
    }
  }
);

export const updateCompanyUserData = createAsyncThunk(
  "profileStore/updateCompanyUserData",
  async ({ id, token, data }) => {
    try {
      const isFormData = data.formData instanceof FormData;
      const response = await axios.put(
        `${brokerAPI}update/contacts/${id}`,
        isFormData ? data.formData : JSON.stringify(data.plainData),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": isFormData
              ? "multipart/form-data"
              : "application/json",
          },
        }
      );
      const responseData = {
        data: response.data.data,
        status: response.status,
        message: response.data.message || "Update successful",
      };

      console.log("✅ Redux Thunk Response:", responseData);
      return responseData; // return all 3 fields
    } catch (error) {
      console.error(
        "Error while submitting user data:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
);

export const updateFeedback = createAsyncThunk(
  "profileStore/updateFeedback",
  async ({ feedbackId, data, token }) => {
    try {
      const response = await axios.put(
        `${brokerAPI}feedback/update-feedback/${feedbackId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = {
        data: response.data,
        message: response.data.message || "Update successful",
      };

      console.log("✅ Redux Thunk Response:", responseData);
      return responseData; // return all 3 fields
    } catch (error) {
      console.error(
        "Error while submitting user data:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
);

export const submitTradingData = createAsyncThunk(
  "profileStore/submitTradingData",
  async ({ data, token }) => {
    try {
      const response = await axios.post(
        `${brokerAPI}company/company-trading`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = {
        data: response.data,
        message: response.data.message || "Update successful",
      };

      console.log("✅ Redux Thunk Response:", responseData);
      return responseData; // return all 3 fields
    } catch (error) {
      console.error(
        "Error while submitting Trading data:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
);

export const submitCompanyCategories = createAsyncThunk(
  "profileStore/submitCompanyCategories",
  async ({ data, token }) => {
    try {
      const response = await axios.post(
        `${brokerAPI}company/company-category`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = {
        data: response.data,
        message: response.data.message || "Update successful",
      };

      console.log("✅ Redux Thunk Response:", responseData);
      return responseData; // return all 3 fields
    } catch (error) {
      console.error(
        "Error while submitting Company Categories data:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
);

export const submitCompanyManufacturers = createAsyncThunk(
  "profileStore/submitCompanyManufacturers",
  async ({ data, token }) => {
    try {
      const response = await axios.post(
        `${brokerAPI}company/company-mfg`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = {
        data: response.data,
        message: response.data.message || "Update successful",
      };

      console.log("✅ Redux Thunk Response:", responseData);
      return responseData; // return all 3 fields
    } catch (error) {
      console.error(
        "Error while submitting Company Mfgs data:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
);

export const submitCompanyreturnPolicy = createAsyncThunk(
  "profileStore/submitCompanyreturnPolicy",
  async ({ data, token }) => {
    try {
      const response = await axios.post(
        `${brokerAPI}company/company-returnPolicy`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = {
        data: response.data,
        message: response.data.message || "Update successful",
      };

      console.log("✅ Redux Thunk Response:", responseData);
      return responseData; // return all 3 fields
    } catch (error) {
      console.error(
        "Error while submitting Company Mfgs data:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
);

export const submitCompanyPhotos = createAsyncThunk(
  "profileStore/submitCompanyPhotos",
  async ({ token, files, imageUrls }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // Append each file as newImage[]
      files.forEach((file) => {
        formData.append("images[]", file);
      });

      // Append each URL as imageUrl[]
      imageUrls.forEach((url) => {
        formData.append("imageUrls[]", url);
      });

      // Debug log
      for (let pair of formData.entries()) {
        console.log("📦 FormData:", pair[0], pair[1]);
      }

      const response = await axios.post(
        `${brokerAPI}company/companyImages`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return {
        status: true,
        image: response?.data || null,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createUser = createAsyncThunk(
  "profileStore/createUser",
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${brokerAPI}user/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const responseData = {
        data: response.data,
        message: response.data.message || "Account created successfully",
      };

      console.log("✅ Redux Thunk Response:", responseData);
      return responseData;
    } catch (error) {
      const err =
        error.response?.data?.message || error.message || "Request failed";

      console.error("❌ Error in createUser thunk:", err);
      return rejectWithValue(err);
    }
  }
);

export const submitUserSettings = createAsyncThunk(
  "profileStore/submitUserSettings",
  async ({ token, optionFormData }) => {
    try {
      const response = await axios.post(
        `${brokerAPI}user-settings/save-user-settings`,
        { optionFormData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(
        "✅User Options Submission Response From Redux: ",
        response?.data
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error while submitting user Options Settings data:",
        error.response?.data || error.message
      );
      throw "Error while submitting user Options Settings data:" || error;
    }
  }
);

export const fetchUserSettings = createAsyncThunk(
  "profileStore/fetchUserSettings",
  async ({ token }) => {
    try {
      const response = await axios.get(
        `${brokerAPI}user-settings/fetch-user-settings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("✅User Options Fetched From Redux: ", response?.data?.data);

      return response.data.data;
    } catch (error) {
      console.error(
        "Error while fetching user Options Settings data:",
        error.response?.data || error.message
      );
      throw "Error while fetching user Options Settings data:" || error;
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
    teams: "",
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
    receiveMatchYourHits: {
      hourly: false,
      daily: false,
    },
    onlyReceiveMatch: {
      my_regions_filter: [],
      my_countries_filter: [],
      my_states_filter: [],
    },
    onlyDisplay: {
      regions_filter: [],
      countries_filter: [],
      states_filter: [],
    },
    displaySettings: {
      language: "english",
      sortPreferences: [
        { sortBy: "", sortOrder: "ASC" },
        { sortBy: "", sortOrder: "ASC" },
        { sortBy: "", sortOrder: "ASC" },
      ],
      sortLock: "0",
      multiplePartSearch: "1",
      itemsPerPage: "20",
    },
    customPartDisplay: {
      alternateRowColors: false,
      showBorders: false,
      showFilters: "2",
      displayFiltersPosition: "2",
      showDetails: false,
      forceDescriptions: false,
      doubleVision: false,
      showHistoryGraphs: false,
    },
    brokerCell: {
      preferredBrokercell: "",
    },
    displayByCondition: {
      NEW: false,
      ASIS: false,
      EXC: false,
      "F/S": false,
      NOB: false,
      REF: false,
      OEMREF: false,
      REP: false,
      USED: false,
    },
    otherSettings: {
      fontSize: "8",
      extendedCompanyInfo: "1",
      contactMethod: "1",
      showContactInfo: "1",
      receiveSiteEmails: "0",
      receiveRFQEmails: "1",
      receiveUpdates: "0",
    },
  },

  initialData: {},
  blurWhileLoading: false,
  customSignature: true,
  error: null,
  searchUserData: [],
  companyLogo: null,
  companyFeedbackData: [],
  feedbackGivenData: [],
  loading: false,
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
      console.log(action.payload);
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
      // Add any other state reset logic here
    },
    resetOptionData: (state) => {
      state.optionFormData = initialState.optionFormData;
    },
    clearLogo: (state) => {
      state.companyLogo = null;
    },
    restoreInitialData: (state) => {
      const defaultFields = {
        firstName: "",
        lastName: "",
        position: "",
        experience: "",
        specialty: "",
        email: "",
        skype: "",
        teams: "",
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
        imScreenNames: {
          skype: "",
          whatsapp: "",
          trillian: "",
        },
        socialNetworking: {
          facebook: "",
          twitter: "",
          linkedin: "",
        },
      };

      state.formData = {
        ...defaultFields,
        ...state.initialData,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      };
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
          currentPassword: "", // Always reset these fields
          newPassword: "",
          confirmNewPassword: "",
        };
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.blurWhileLoading = true;
        state.error = action.error.message;
      })
      .addCase(submitUserData.pending, (state) => {
        state.blurWhileLoading = false;
      })
      .addCase(submitUserData.fulfilled, (state, action) => {
        const { data: updatedUser, message, status } = action.payload;

        console.log("🟢 Redux Store Updated with:", updatedUser);
        console.log("📡 Status:", status);
        console.log("📩 Message:", message);

        state.initialData = updatedUser;

        state.formData = {
          ...state.formData,
          ...updatedUser,
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
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
        state.searchUserData = action.payload;
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
      })
      .addCase(submitCompanyPhotos.pending, (state) => {
        console.log("Pending....");
      })
      .addCase(submitCompanyPhotos.fulfilled, (state, action) => {
        console.log("Company photos updation Fulfilled....");
      })
      .addCase(submitCompanyPhotos.rejected, (state, action) => {
        console.log(action.error.message);
        state.error = action.error.message;
      })
      .addCase(getCompanyFeedback.pending, (state) => {
        state.blurWhileLoading = false;
        console.log("Pending....");
      })
      .addCase(getCompanyFeedback.fulfilled, (state, action) => {
        state.blurWhileLoading = true;
        state.companyFeedbackData = action.payload;
        console.log("Fulfilled Case: ", action.payload);
      })
      .addCase(getCompanyFeedback.rejected, (state, action) => {
        console.log(action.error.message);
        state.error = action.error.message;
        state.blurWhileLoading = false;
      })
      .addCase(removeReceiveFeedback.pending, (state) => {
        state.blurWhileLoading = false;
        console.log("🔄 Feedback deletion pending...");
      })
      .addCase(removeReceiveFeedback.fulfilled, (state, action) => {
        state.blurWhileLoading = true;
        const deletedId = action.payload?.data?.id;

        if (deletedId) {
          state.companyFeedbackData = state.companyFeedbackData.filter(
            (feedback) => feedback.id !== deletedId
          );
          console.log("✅ Feedback deleted successfully:", deletedId);
        } else {
          console.warn("⚠️ No feedback ID found in payload.");
        }
      })
      .addCase(removeReceiveFeedback.rejected, (state, action) => {
        state.error = action.error.message;
        state.blurWhileLoading = false;
        console.error("❌ Feedback deletion failed:", action.error.message);
      })
      .addCase(updateFeedback.pending, (state) => {
        state.blurWhileLoading = false;
        console.log("🔄 Feedback Updation pending...");
      })
      .addCase(updateFeedback.fulfilled, (state, action) => {
        state.blurWhileLoading = true;
        console.log("✅ Feedback Updated successfully:");
      })
      .addCase(updateFeedback.rejected, (state, action) => {
        state.error = action.error.message;
        state.blurWhileLoading = false;
        console.error("❌ Feedback Updation failed:", action.error.message);
      })
      .addCase(fetchGivenFeedback.pending, (state) => {
        state.blurWhileLoading = false;
        console.log("Pending....");
      })
      .addCase(fetchGivenFeedback.fulfilled, (state, action) => {
        state.blurWhileLoading = true;
        state.feedbackGivenData = action.payload;
        console.log("Fulfilled Case: ", action.payload);
      })
      .addCase(fetchGivenFeedback.rejected, (state, action) => {
        console.log(action.error.message);
        state.error = action.error.message;
        state.blurWhileLoading = false;
      })
      .addCase(updateCompanyUserData.pending, (state) => {
        console.log("Pending....");
      })
      .addCase(updateCompanyUserData.fulfilled, (state, action) => {
        console.log("Company User Updation Fulfilled!: ", action.payload);
      })
      .addCase(updateCompanyUserData.rejected, (state, action) => {
        console.log("REJECTED: ", action.error.message);
      })
      .addCase(fetchUserSettings.pending, (state) => {
        console.log("Pending....");
        state.loading = true;
      })
      .addCase(fetchUserSettings.fulfilled, (state, action) => {
        console.log("✅Fetched User Settings Fulfilled!: ", action.payload);
        state.optionFormData = action.payload?.settings;
        state.loading = false;
      })
      .addCase(fetchUserSettings.rejected, (state, action) => {
        console.log("REJECTED: ", action.error.message);
        state.loading = false;
      });
  },
});

export const {
  setFormData,
  setOptionFormData,
  setCustomSignature,
  setBlurWhileLoading,
  resetProfileState,
  clearLogo,
  restoreInitialData,
  resetOptionData,
} = profileSlice.actions;

export default profileSlice.reducer;
