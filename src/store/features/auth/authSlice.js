import {
  getProfile,
  changePassword,
  updateProfile,
  getUsers,
  assignRole,
} from "./authAPI";

import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  users: [],
  totalPages: 0,
  currentPage: 1,
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

export const fetchUsers = createAsyncThunk(
  "auth/fetchUsers",
  async ({ page, limit, name }) => {
    try {
      const response = await getUsers(page, limit, name);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

// update user role updateUserRoles
export const updateUserRoles = createAsyncThunk(
  "auth/updateUserRoles",
  async (roleData) => {
    try {
      const response = await assignRole(roleData);
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
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload.data.users;
      state.totalPages = action.payload.data.totalPages;
      state.currentPage = action.payload.data.currentPage;
    });
    builder.addCase(updateUserRoles.fulfilled, (state, action) => {
      state.users = state.users.map((user) => {
        if (user._id === action.payload._id) {
          return action.payload;
        }
        return user;
      });
    });
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
