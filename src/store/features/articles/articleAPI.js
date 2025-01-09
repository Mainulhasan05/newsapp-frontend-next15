import axiosInstance from "@/utils/axiosInstance";
// create, update,delete, get
// /api/articles post, put, delete, /

export const createArticleAPI = async (articleData) => {
  try {
    const response = await axiosInstance.post("/api/articles", articleData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateArticleAPI = async (articleData) => {
  try {
    const response = await axiosInstance.put(
      `/api/articles/${articleData.id}`,
      articleData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteArticleAPI = async (articleId) => {
  try {
    const response = await axiosInstance.delete(`/api/articles/${articleId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getArticleAPI = async (articleId) => {
  try {
    const response = await axiosInstance.get(`/api/articles/${articleId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchArticlesAPI = async (page = 1, searchTerm = "") => {
  console.log("searchTerm", searchTerm);
  console.log("page", page);
  try {
    const response = await axiosInstance.get(
      `/api/articles?page=${page}&title=${searchTerm}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
