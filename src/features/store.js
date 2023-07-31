import { configureStore } from "@reduxjs/toolkit";
import allPostsSlice from "./allPosts.slice";
import usersSlice from "./users.slice";

export const store = configureStore({
    reducer:{
        allPosts : allPostsSlice,
        user: usersSlice,
    },
});