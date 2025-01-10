import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteImageAPI, fetchGallery, uploadImageAPI } from "./galleryAPI";

const initialState = {
  images: [],
  totalPages: 0,
  currentPage: 1,

  loading: false,
  error: null,
};

export const fetchGalleryImages = createAsyncThunk(
  "gallery/fetchGalleryImages",
  async (page) => {
    try {
      const response = await fetchGallery(page);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteImage = createAsyncThunk(
  "gallery/deleteGalleryImage",
  async (imageId) => {
    try {
      const response = await deleteImageAPI(imageId);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const uploadImage = createAsyncThunk(
  "gallery/uploadGalleryImage",
  async (image) => {
    try {
      const response = await uploadImageAPI(image);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGalleryImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGalleryImages.fulfilled, (state, action) => {
        state.images = action.payload?.images;
        state.totalPages = action.payload?.totalPages;
        state.currentPage = action.payload?.currentPage;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchGalleryImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.images = state.images.filter(
          (image) => image._id !== action.payload._id
        );
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.images.push(action.payload);
      });
  },
});

export default gallerySlice.reducer;
