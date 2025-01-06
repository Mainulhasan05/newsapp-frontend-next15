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
