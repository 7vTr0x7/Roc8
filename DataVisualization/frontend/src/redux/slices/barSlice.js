import { createSlice } from "@reduxjs/toolkit";

const barSlice = createSlice({
  name: "bar",
  initialState: {
    bar: "a",
  },
  reducers: {
    changeBar: (state, action) => {
      return {
        ...state,
        bar: action.payload,
      };
    },
  },
});

export const { changeBar } = barSlice.actions;
export default barSlice.reducer;
