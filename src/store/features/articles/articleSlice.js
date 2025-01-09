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
  currentArticle: null,
  totalPages: 0,
  currentPage: 1,
  loading: false,
  error: null,
};

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async ({ page, searchTerm }) => {
    try {
      const response = await fetchArticlesAPI(page, searchTerm);
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
        state.articles = action.payload.data.articles;
        state.totalPages = action.payload.data.totalPages;
        state.currentPage = action.payload.data.currentPage;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addArticle.fulfilled, (state, action) => {
        state.articles.push(action.payload);
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.articles = state.articles.filter(
          (article) => article._id !== action.payload._id
        );
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        const index = state.articles.findIndex(
          (article) => article._id === action.payload._id
        );
        state.articles[index] = action.payload;
      })
      // fetchArticle
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.currentArticle = action.payload?.data;
      });
  },
});

export default articleSlice.reducer;

export const selectArticles = (state) => state.articles.articles;
