import { configureStore } from "@reduxjs/toolkit";
import emailsReducer from "./slices/emailSlice";
import filterReducer from "./slices/filterSlice";

const store = configureStore({
  reducer: {
    emails: emailsReducer,
    filter: filterReducer,
  },
});

export default store;
