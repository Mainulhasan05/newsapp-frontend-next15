import axiosInstance from "@/utils/axiosInstance";

// api/gallery
// fetch by pagination
export const fetchGallery = async (page = 1) => {
  try {
    const response = await axiosInstance.get(`/api/gallery?page=${page}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadImageAPI = async (image) => {
  try {
    const response = await axiosInstance.post("/api/gallery", image);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteImageAPI = async (imageId) => {
  try {
    const response = await axiosInstance.delete(`/api/gallery/${imageId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
