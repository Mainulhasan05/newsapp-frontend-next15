import axiosInstance from "@/utils/axiosInstance";

// /api/auth/profile
export const getProfile = async () => {
  try {
    const response = await axiosInstance.get("/api/auth/profile");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// /api/auth/update-profile
export const updateProfile = async (profileData) => {
  try {
    const response = await axiosInstance.put(
      "/api/auth/update-profile",
      profileData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
// /api/auth/change-password
export const changePassword = async (passwordData) => {
  try {
    const response = await axiosInstance.put(
      "/api/auth/change-password",
      passwordData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// api/auth/users , page, limit, name
export const getUsers = async (page = 1, limit = 15, name = "") => {
  try {
    const response = await axiosInstance.get(
      `/api/auth/users?page=${page}&limit=${limit}&name=${name}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// /api/auth/assign-role, post const { userId, role } = req.body;
export const assignRole = async (roleData) => {
  try {
    const response = await axiosInstance.post(
      "/api/auth/assign-role",
      roleData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
