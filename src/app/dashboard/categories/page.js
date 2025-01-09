"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  deleteCategory,
} from "@/store/features/categories/categoriesSlice";
import CategoryList from "@/Components/Dashboard/Categories/CategoryList";
import CategoryModal from "@/Components/Dashboard/Categories/CategoryModal";
import Pagination from "@/Components/Pagination";

export default function CategoriesPage() {
  const dispatch = useDispatch();
  const {
    categories,
    totalPages = 10,
    currentPage = 1,
    loading = false,
    error = null,
  } = useSelector((state) => state.categories);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    if (categories.length === 0) dispatch(fetchCategories(1));
  }, [dispatch]);

  const handlePageChange = (page) => {
    dispatch(fetchCategories(page));
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      await dispatch(deleteCategory(categoryId));
      dispatch(fetchCategories(currentPage));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button
          onClick={handleAddCategory}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Category
        </button>
      </div>
      <CategoryList
        categories={categories}
        onEdit={handleEditCategory}
        onDelete={handleDeleteCategory}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {isModalOpen && (
        <CategoryModal category={editingCategory} onClose={handleCloseModal} />
      )}
    </div>
  );
}
