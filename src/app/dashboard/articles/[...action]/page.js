"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import {
  fetchArticle,
  addArticle,
  updateArticle,
} from "@/store/features/articles/articleSlice";
import { fetchCategories } from "@/store/features/categories/categoriesSlice";
import ImageUploadModal from "@/Components/Gallery/ImageUploadModal ";
import ImageGalleryModal from "@/Components/Gallery/ImageGalleryModal";
import { fetchGalleryImages } from "@/store/features/gallery/gallerySlice";
import Image from "next/image";

const QuillEditor = dynamic(() => import("@/Components/QuillEditor"), {
  ssr: false,
});

export default function ArticleForm({ params }) {
  const { images } = useSelector((state) => state.gallery);
  const resolvedParams2 = React.use(params);
  const resolvedParams = {
    action: resolvedParams2.action[0],
    id: resolvedParams2.action?.length > 1 ? resolvedParams2.action[1] : null,
  };
  const dispatch = useDispatch();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const { categories } = useSelector((state) => state.categories);
  const { currentArticle, loading, error } = useSelector(
    (state) => state.articles
  );
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    category: "",
    featuredImage: "",
    isFeatured: false,
    status: "draft",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
  });

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchGalleryImages());

    if (resolvedParams.action === "edit" && resolvedParams.id) {
      dispatch(fetchArticle(resolvedParams.id));
    }
  }, [dispatch, resolvedParams.action, resolvedParams.id]);

  useEffect(() => {
    if (currentArticle && resolvedParams.action === "edit") {
      setFormData({
        ...currentArticle,
        tags: currentArticle.tags.join(", "),
      });
    }
  }, [currentArticle, resolvedParams.action]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleContentChange = (content) => {
    console.log("Content changed:", content);
    setFormData((prevState) => ({ ...prevState, content }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const articleData = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };
    if (resolvedParams.action === "edit") {
      dispatch(updateArticle({ id: resolvedParams.id, ...articleData }));
    } else {
      dispatch(addArticle(articleData));
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-red-600">
        Error: {error}
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600">
          <h1 className="text-3xl font-bold text-white">
            {resolvedParams.action === "edit"
              ? "Edit Article"
              : "Add New Article"}
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Content
            </label>
            <QuillEditor
              isEdit={resolvedParams.action === "edit"}
              value={formData.content}
              onChange={handleContentChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Tags (comma-separated)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Image Gallery</h1>
              <div>
                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600 transition-colors"
                >
                  Upload Image
                </button>
                <button
                  onClick={() => setIsGalleryModalOpen(true)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                >
                  View All Images
                </button>
              </div>
            </div>
            <label
              htmlFor="featuredImage"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Featured Image URL
            </label>
            <input
              type="text"
              id="featuredImage"
              name="featuredImage"
              value={formData.featuredImage}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {
            // if formData?.featuredImage is not empty, show the image
            formData?.featuredImage && (
              <div className="mt-4">
                <Image
                  width={200}
                  height={200}
                  src={formData.featuredImage}
                  alt="Featured Image"
                  className="max-w-full"
                />
              </div>
            )
          }
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isFeatured"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="isFeatured"
              className="ml-2 block text-sm text-gray-900"
            >
              Featured Article
            </label>
          </div>
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="metaTitle"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Meta Title
              </label>
              <input
                type="text"
                id="metaTitle"
                name="metaTitle"
                value={formData.metaTitle}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="metaKeywords"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Meta Keywords
              </label>
              <input
                type="text"
                id="metaKeywords"
                name="metaKeywords"
                value={formData.metaKeywords}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="metaDescription"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Meta Description
            </label>
            <textarea
              id="metaDescription"
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
            >
              {resolvedParams.action === "edit"
                ? "Update Article"
                : "Create Article"}
            </button>
          </div>
        </form>
        <ImageUploadModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
        />
        <ImageGalleryModal
          isOpen={isGalleryModalOpen}
          onClose={() => setIsGalleryModalOpen(false)}
          images={images}
        />
      </div>
    </div>
  );
}
