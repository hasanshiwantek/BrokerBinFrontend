// focusSlice.js
import { createSlice } from '@reduxjs/toolkit';

const focusSlice = createSlice({
  name: 'focus',
  initialState: { shouldFocusSearch: false },
  reducers: {
    triggerSearchFocus: (state) => {
      state.shouldFocusSearch = true;
    },
    resetSearchFocus: (state) => {
      state.shouldFocusSearch = false;
    },
  },
});

export const { triggerSearchFocus, resetSearchFocus } = focusSlice.actions;
export default focusSlice.reducer;
