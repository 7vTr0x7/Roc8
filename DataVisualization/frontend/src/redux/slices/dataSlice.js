import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    filteredData: [],
  },
  reducers: {
    addData: (state, action) => {
      return {
        ...state,
        data: action.payload,
        filteredData: action.payload,
      };
    },
    resetData: (state, action) => {
      return {
        ...state,
        filteredData: state.data,
      };
    },
  },
});

export const { addData, resetData } = dataSlice.actions;
export default dataSlice.reducer;
