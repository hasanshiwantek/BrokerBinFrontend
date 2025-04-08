import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "./InventorySlice";
import profileReducer from "./ProfleSlice";
import homeReducer from "./HomeSlice";
import rfqReducer from "./RfqSlice";
import searchProductReducer from "./SearchProductSlice";
import broadcastReducer from "./BroadCast";
import ToolsReducer from "./ToolsSlice";
import ReportsReducer from "./Reports";
import userReducer from "./UserSlice";
import focusReducer from "./focusSlice";

const store = configureStore({
  reducer: {
    inventoryStore: inventoryReducer,
    profileStore: profileReducer,
    homeStore: homeReducer,
    rfqStore: rfqReducer,
    searchProductStore: searchProductReducer,
    broadcastStore: broadcastReducer,
    toolsStore: ToolsReducer,
    reports: ReportsReducer,
    userStore: userReducer,
    focus: focusReducer,
  },
});

export default store;
