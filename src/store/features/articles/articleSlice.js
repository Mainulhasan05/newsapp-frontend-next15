import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchArticlesAPI,
  createArticleAPI,
  deleteArticleAPI,
  updateArticleAPI,
  getArticleAPI,
} from "./articleAPI";

const initialState = {
  articles: [],
  totalPages: 0,
  currentPage: 1,
  loading: false,
  error: null,
};

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (page) => {
    try {
      const response = await fetchArticlesAPI(page);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const addArticle = createAsyncThunk(
  "articles/addArticle",
  async (articleData) => {
    try {
      const response = await createArticleAPI(articleData);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteArticle = createAsyncThunk(
  "articles/deleteArticle",
  async (articleId) => {
    try {
      const response = await deleteArticleAPI(articleId);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const updateArticle = createAsyncThunk(
  "articles/updateArticle",
  async (articleData) => {
    try {
      const response = await updateArticleAPI(articleData);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchArticle = createAsyncThunk(
  "articles/getArticle",
  async (articleId) => {
    try {
      const response = await getArticleAPI(articleId);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload.data.data;
        state.totalPages = action.payload.data.totalPages;
        state.currentPage = action.payload.data.currentPage;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default articleSlice.reducer;

export const selectArticles = (state) => state.articles.articles;
