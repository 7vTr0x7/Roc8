import { createSlice } from "@reduxjs/toolkit";

const emailSlice = createSlice({
  name: "emails",
  initialState: {
    all: [],
    read: [],
    unread: [],
    favorites: [],
  },
  reducers: {
    addData: (state, action) => {
      return {
        ...state,
        unread: action.payload,
        all: action.payload,
      };
    },
    updateUnread: (state, action) => {
      const exists = state.read.find((email) => email.id === action.payload.id);
      if (!exists) {
        return {
          ...state,
          read: [...state.read, action.payload],
          unread: state.unread.filter(
            (email) => email.id !== action.payload.id
          ),
        };
      }
    },
    addToFavorites: (state, action) => {
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    },
    removeFromFavorites: (state, action) => {
      return {
        ...state,
        favorites: state.favorites.filter(
          (email) => email.id !== action.payload
        ),
      };
    },
  },
});

export const { addData, updateUnread, addToFavorites, removeFromFavorites } =
  emailSlice.actions;

export default emailSlice.reducer;
