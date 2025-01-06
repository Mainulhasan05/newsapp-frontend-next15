import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Simulated API calls
const fetchCategoriesAPI = (page) =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          categories: [
            {
              _id: "1",
              name: "Technology",
              slug: "technology",
              status: "active",
            },
            { _id: "2", name: "Sports", slug: "sports", status: "active" },
            {
              _id: "3",
              name: "Entertainment",
              slug: "entertainment",
              status: "inactive",
            },
          ],
          totalPages: 3,
          currentPage: page,
        }),
      1000
    )
  );
const addCategoryAPI = (categoryData) =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve({ ...categoryData, _id: Date.now().toString() }),
      1000
    )
  );
const updateCategoryAPI = (categoryData) =>
  new Promise((resolve) => setTimeout(() => resolve(categoryData), 1000));
const deleteCategoryAPI = (id) =>
  new Promise((resolve) => setTimeout(() => resolve(id), 1000));

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (page, { rejectWithValue }) => {
    try {
      const response = await fetchCategoriesAPI(page);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await addCategoryAPI(categoryData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await updateCategoryAPI(categoryData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      await deleteCategoryAPI(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  categories: [],
  totalPages: 0,
  currentPage: 1,
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          (cat) => cat._id === action.payload._id
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (cat) => cat._id !== action.payload
        );
      });
  },
});

export default categorySlice.reducer;
