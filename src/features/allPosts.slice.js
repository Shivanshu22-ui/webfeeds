import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allPosts: [],
    lightTheme: false
  };

  export const slice = createSlice({
    name: "allPosts",
    initialState,
    reducers: {
      setAllPosts: (state, action) => {
        state.allPosts = [...new Set([...state.allPosts,... action.payload])];
      },
      likeSinglePost : (state, action) => {
        let newAllPosts = state.allPosts;
      },
      setTheme:(state, action) => {
        state.lightTheme = action.payload;
      },
    },
  });
  
  export const { setAllPosts , likeSinglePost ,setTheme} = slice.actions;
  
  export default slice.reducer;
  