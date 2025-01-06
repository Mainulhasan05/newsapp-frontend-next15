"use client";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import categoriesSlice from "./features/categoriesSlice";
// import newsReducer from "./features/newsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesSlice,
    // news: newsReducer,
  },
});
