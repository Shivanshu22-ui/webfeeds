import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: [],
  currentUsersPosts: [],
  currentUserActive:false,
};

export const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setUserPosts: (state, action) => {
      state.currentUsersPosts = [
        ...new Set([...state.currentUsersPosts, ...action.payload]),
      ];
    },
    emptyUser: (state, action) => {
      state.currentUsersPosts = [];
      state.currentUser=[];
    },
    currentNavActive: (state, action) => {
      state.currentUserActive = action.payload;
    },
  },
});

export const { setUser, setUserPosts, emptyUser ,currentNavActive} = slice.actions;

export default slice.reducer;
