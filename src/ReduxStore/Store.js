import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "./InventorySlice";
import profileReducer from "./ProfleSlice";
import homeReducer from "./HomeSlice";
import rfqReducer from "./RfqSlice";
import searchProductReducer from "./SearchProductSlice";
import broadcastReducer from "./BroadCast";

const store = configureStore({
  reducer: {
    inventoryStore: inventoryReducer,
    profileStore: profileReducer,
    homeStore: homeReducer,
    rfqStore: rfqReducer,
    searchProductStore: searchProductReducer,
    broadcastStore: broadcastReducer,
  },
});

export default store;
