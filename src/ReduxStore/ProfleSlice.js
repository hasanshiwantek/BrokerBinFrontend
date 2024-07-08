import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserData = createAsyncThunk(
  "profileStore/fetchUserData",
  async ({ id, token }) => {
    try {
      const response = await axios.get(
        `https://brokerbinbackend.advertsedge.com/api/user/fetch/${id}`,
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
        `https://brokerbinbackend.advertsedge.com/api/user/edit/${id}`,
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

export const { setFormData, setCustomSignature, setBlurWhileLoading } =
  profileSlice.actions;

export default profileSlice.reducer;
