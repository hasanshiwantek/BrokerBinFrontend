import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mobileNavToggle: false,
  dropdownOpen: {
    main: false,
    search: false,
    manage: false,
  },
  toolToggle: true,
};

const HomeSlice = createSlice({
  name: "homeStore",
  initialState,
  reducers: {
    setMobileNavToggle: (state, action) => {
      state.mobileNavToggle = !state.mobileNavToggle;
    },
    setDropdownOpen: (state, action) => {
      state.dropdownOpen[action.payload] = !state.dropdownOpen[action.payload];
    },
    setToolToggle: (state, action) => {
      state.toolToggle = !state.toolToggle;
    },
  },
  extraReducers: (builder) => {},
});

export const { setMobileNavToggle, setDropdownOpen, setToolToggle } =
  HomeSlice.actions;

export default HomeSlice.reducer;
