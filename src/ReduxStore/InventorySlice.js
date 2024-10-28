import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { brokerAPI } from "../components/api/BrokerEndpoint";
export const sendInventoryFile = createAsyncThunk(
  "inventoryStore/sendInventoryFile",
  async ({ token, formDataObject }) => {
    try {
      const response = await axios.post(
        `${brokerAPI}inventory/upload`,
        formDataObject,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error uploading inventory file:",
        error.response?.data || error.message
      );
      throw "Error uploading inventory file:" || error;
    }
  }
);

const initialState = {
  // Add inventory data
  inventoryAddData: [
    {
      partModel: "",
      heciClei: "",
      mfg: "",
      price: "",
      quantity: "",
      status: "stock",
      productDescription: "",
      cond: "new",
    },
    {
      partModel: "",
      heciClei: "",
      mfg: "",
      price: "",
      quantity: "",
      status: "stock",
      productDescription: "",
      cond: "new",
    },
    {
      partModel: "",
      heciClei: "",
      mfg: "",
      price: "",
      quantity: "",
      status: "stock",
      productDescription: "",
      cond: "new",
    },
    {
      partModel: "",
      heciClei: "",
      mfg: "",
      price: "",
      quantity: "",
      status: "stock",
      productDescription: "",
      cond: "new",
    },
    {
      partModel: "",
      heciClei: "",
      mfg: "",
      price: "",
      quantity: "",
      status: "stock",
      productDescription: "",
      cond: "new",
    },
    {
      partModel: "",
      heciClei: "",
      mfg: "",
      price: "",
      quantity: "",
      status: "stock",
      productDescription: "",
      cond: "new",
    },
    {
      partModel: "",
      heciClei: "",
      mfg: "",
      price: "",
      quantity: "",
      status: "stock",
      productDescription: "",
      cond: "new",
    },
    {
      partModel: "",
      heciClei: "",
      mfg: "",
      price: "",
      quantity: "",
      status: "stock",
      productDescription: "",
      cond: "new",
    },
  ],

  // another file button
  addAnotherFiles: [{ file: null, status: "Stock" }],
  error: null,
};

const InventorySlice = createSlice({
  name: "inventoryStore",
  initialState,
  reducers: {
    setInventoryAddData: (state, action) => {
      state.inventoryAddData = action.payload;
    },

    setAddAnotherFiles: (state, action) => {
      // state.addAnotherFiles.push(action.payload);
      state.addAnotherFiles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendInventoryFile.pending, (state) => {
        console.log("sending");
      })
      .addCase(sendInventoryFile.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(sendInventoryFile.rejected, (state, action) => {
        console.log(action.error.message);
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const { setAddInventory, setInventoryAddData, setAddAnotherFiles } =
  InventorySlice.actions;

export default InventorySlice.reducer;
