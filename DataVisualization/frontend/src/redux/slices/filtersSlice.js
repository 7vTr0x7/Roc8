import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    filters: {},
    reset: false,
  },
  reducers: {
    changeFilters: (state, action) => {
      const { startDate, endDate, ...rest } = action.payload;

      const serializedFilters = {
        ...rest,
        startDate: startDate ? new Date(startDate).toISOString() : null, // Store as ISO string
        endDate: endDate ? new Date(endDate).toISOString() : null, // Store as ISO string
      };

      return {
        ...state,
        filters: serializedFilters,
      };
    },
    resetFilters: (state) => {
      return {
        ...state,
        filters: {},
      };
    },
    reset: (state, action) => {
      return {
        ...state,
        reset: action.payload,
      };
    },
  },
});

export const { changeFilters, resetFilters, reset } = filtersSlice.actions;
export default filtersSlice.reducer;
