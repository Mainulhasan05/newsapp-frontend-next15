import axiosInstance from "@/utils/axiosInstance";

// /api/categories
export const fetchCategoriesAPI = async (page = 1, name = "") => {
  try {
    const response = await axiosInstance.get(
      `/api/categories?page=${page}&name=${name}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// /api/categories
export const addCategoryAPI = async (categoryData) => {
  try {
    const response = await axiosInstance.post("/api/categories", categoryData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// /api/categories/:id
export const updateCategoryAPI = async (categoryId, categoryData) => {
  try {
    const response = await axiosInstance.put(
      `/api/categories/${categoryId}`,
      categoryData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// /api/categories/:id
export const deleteCategoryAPI = async (categoryId) => {
  try {
    const response = await axiosInstance.delete(
      `/api/categories/${categoryId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
