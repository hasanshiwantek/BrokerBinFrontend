import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { brokerAPI } from "../components/api/BrokerEndpoint";

// export const sendInventoryFile = createAsyncThunk(
//   "inventoryStore/sendInventoryFile",
//   async ({ token, formData }) => {
//     try {
//       const response = await axios.post(
//         `${brokerAPI}inventory/upload`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             // "Content-Type": "application/json", // Remove this line
//             // Let the browser set "multipart/form-data" automatically
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error(
//         "Error uploading inventory file:",
//         error.response?.data || error.message
//       );
//       throw error.response?.data || error;
//     }
//   }
// );

export const sendInventoryFile = createAsyncThunk(
  "inventoryStore/sendInventoryFile",
  async ({ token, formData }) => {
    try {
      const response = await axios.post(
        `${brokerAPI}inventory/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token
            // Do not set Content-Type manually
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error uploading inventory file:",
        error.response?.data || error.message
      );
      throw error.response?.data || error;
    }
  }
);



export const getInventoryData = createAsyncThunk(
  "inventoryStore/getInventoryData",
  async ({ token, page }) => {
    try {
      const response = await axios.get(
        `${brokerAPI}inventory/get?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error Fetching inventory Data:", error.response?.data);
      throw error.response?.data;
    }
  }
);



export const updateInventoryData = createAsyncThunk(
  "inventoryStore/updateInventoryData",
  async ({ token,data}) => {
    try {
      const response = await axios.put(
        `${brokerAPI}inventory/update`,
        data,
  
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
          
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error Fetching inventory Data:",
        error.response?.data 
      );
      throw error.response?.data 
    }
  }
);




const initialState = {
  // Add inventory data
  inventoryData:{},
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
      })
      .addCase(getInventoryData.pending, (state) => {
        console.log("FETCHING INVENTORY DATA FROM REDUX");
      })
      .addCase(getInventoryData.fulfilled, (state, action) => {
        state.inventoryData=action.payload
        console.log("PAYLOAD FROM REDUX",action.payload)
      })
      .addCase(getInventoryData.rejected, (state, action) => {
        console.error("ERROR FETCHING INVENTORY DATA", action.error);
        if (action.error.message === "Unauthorized") {
          // Redirect to login or show login prompt
        }
      });
  },
});

// Action creators are generated for each case reducer function
export const { setAddInventory, setInventoryAddData, setAddAnotherFiles } =
  InventorySlice.actions;

export default InventorySlice.reducer;
