import { getProfile, changePassword, updateProfile } from "./authAPI";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

export const fetchProfile = createAsyncThunk("auth/fetchProfile", async () => {
  try {
    const response = await getProfile();
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (profileData) => {
    try {
      const response = await updateProfile(profileData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const changeUserPassword = createAsyncThunk(
  "auth/changeUserPassword",
  async (passwordData) => {
    try {
      const response = await changePassword(passwordData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(changeUserPassword.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
