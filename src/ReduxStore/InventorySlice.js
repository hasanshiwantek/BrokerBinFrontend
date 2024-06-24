import { createSlice } from "@reduxjs/toolkit";

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
});

// Action creators are generated for each case reducer function
export const { setAddInventory, setInventoryAddData, setAddAnotherFiles } =
  InventorySlice.actions;

export default InventorySlice.reducer;
