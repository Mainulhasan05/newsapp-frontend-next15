"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  articles: [],
  sideNews: [],
  loading: false,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    setSideNews: (state, action) => {
      state.sideNews = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setArticles, setSideNews, setLoading } = newsSlice.actions;
export default newsSlice.reducer;
