import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "./InventorySlice";
import profileReducer from "./ProfleSlice";
import homeReducer from "./HomeSlice";
import rfqReducer from "./RfqSlice";

const store = configureStore({
  reducer: {
    inventoryStore: inventoryReducer,
    profileStore: profileReducer,
    homeStore: homeReducer,
    rfqStore: rfqReducer,
  },
});

export default store;
