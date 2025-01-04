"use client";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/features/auth/authSlice";
import newsReducer from "../store/features/news/newsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    news: newsReducer,
  },
});

export default function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
