import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addCategoryAPI,
  deleteCategoryAPI,
  fetchCategoriesAPI,
  updateCategoryAPI,
} from "./categoriesAPI";

const initialState = {
  categories: [],
  totalPages: 0,
  currentPage: 1,
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (page) => {
    try {
      const response = await fetchCategoriesAPI(page, name);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (categoryData) => {
    try {
      const response = await addCategoryAPI(categoryData);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ categoryId, categoryData }) => {
    try {
      const response = await updateCategoryAPI(categoryId, categoryData);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId) => {
    try {
      const response = await deleteCategoryAPI(categoryId);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload?.data?.categories;
        state.totalPages = action.payload?.data?.totalPages;
        state.currentPage = action.payload?.data?.currentPage;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          (category) => category.id === action.payload.id
        );
        state.categories[index] = action.payload;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload.id
        );
      });
  },
});

export default categoriesSlice.reducer;
