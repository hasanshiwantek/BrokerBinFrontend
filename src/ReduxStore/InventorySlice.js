import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  token: Cookies.get("token"),
  user_id: Cookies.get("user_id"),

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

export const InventorySlice = createSlice({
  name: "inventoryStore",
  initialState,
  reducers: {
    setAddInventory: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.addInventory.push(action.payload);
    },

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
