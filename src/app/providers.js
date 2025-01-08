"use client";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/features/auth/authSlice";
import newsReducer from "../store/features/news/newsSlice";
import categoriesSlice from "@/store/features/categories/categoriesSlice";
import articleSlice from "@/store/features/articles/articleSlice";
import gallerySlice from "@/store/features/gallery/gallerySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    news: newsReducer,
    categories: categoriesSlice,
    articles: articleSlice,
    gallery: gallerySlice,
  },
});

export default function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
