import { configureStore } from "@reduxjs/toolkit";
import barReducer from "./slices/barSlice";
import filtersReducer from "./slices/filtersSlice";
import dataReducer from "./slices/dataSlice";

const store = configureStore({
  reducer: {
    bar: barReducer,
    filters: filtersReducer,
    data: dataReducer,
  },
});

export default store;
