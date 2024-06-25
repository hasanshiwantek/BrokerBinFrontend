import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const fetchUserData = createAsyncThunk(
  "profileStore/fetchUserData",
  async ({ id, token }) => {
    try {
      const response = await axios.get(
        `https://brokerbinbackend.advertsedge.com/api/user/fetc/${id}`,
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
    }
  }
);

export const submitUserData = createAsyncThunk(
  "profileStore/submitUserData",
  async ({ id, token, data }) => {
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
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  token: Cookies.get("token"),
  user_id: Cookies.get("user_id"),
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
        state.initialData = action.payload;
        state.formData = {
          ...state.formData,
          ...action.payload,
        };
        state.blurWhileLoading = true;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.error = action.error.message;
        state.blurWhileLoading = false;
      })
      .addCase(submitUserData.pending, (state) => {
        state.blurWhileLoading = false;
      })
      .addCase(submitUserData.fulfilled, (state, action) => {
        state.blurWhileLoading = true;
        state.initialData = action.payload;
        state.formData = {
          ...state.formData,
          ...action.payload,
        };
      })
      .addCase(submitUserData.rejected, (state, action) => {
        state.error = action.error.message;
        state.blurWhileLoading = false;
      });
  },
});

export const { setFormData, setCustomSignature, setBlurWhileLoading } =
  profileSlice.actions;

export default profileSlice.reducer;
