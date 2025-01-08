import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteImageAPI, fetchGallery, uploadImageAPI } from "./galleryAPI";

const initialState = {
  images: [],
  loading: false,
  error: null,
};

export const fetchGalleryImages = createAsyncThunk(
  "gallery/fetchGalleryImages",
  async () => {
    try {
      const response = await fetchGallery();
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
        state.loading = false;
        state.images = action.payload;
      })
      .addCase(fetchGalleryImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.loading = false;
        state.images.push(action.payload);
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.loading = false;
        state.images = state.images.filter(
          (image) => image._id !== action.payload
        );
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default gallerySlice.reducer;
