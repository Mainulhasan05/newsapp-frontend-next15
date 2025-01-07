import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addCategory,
  updateCategory,
} from "@/store/features/categories/categoriesSlice";

export default function CategoryModal({ category, onClose }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",

    description: "",
    image: "",
    parentCategory: "",
    isFeatured: false,
    status: "active",
    sortValue: 0,
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
  });

  useEffect(() => {
    if (category) {
      setFormData(category);
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (category) {
      dispatch(updateCategory({ id: category._id, ...formData }));
    } else {
      dispatch(addCategory(formData));
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {category ? "Edit Category" : "Add New Category"}
          </h3>
          <form onSubmit={handleSubmit} className="mt-2">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="mt-2 p-2 w-full border rounded"
              required
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="mt-2 p-2 w-full border rounded"
            />
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="mt-2 p-2 w-full border rounded"
            />
            <input
              type="text"
              name="parentCategory"
              value={formData.parentCategory}
              onChange={handleChange}
              placeholder="Parent Category ID"
              className="mt-2 p-2 w-full border rounded"
            />
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <span className="ml-2">Featured</span>
              </label>
            </div>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-2 p-2 w-full border rounded"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <input
              type="number"
              name="sortValue"
              value={formData.sortValue}
              onChange={handleChange}
              placeholder="Sort Value"
              className="mt-2 p-2 w-full border rounded"
            />
            <input
              type="text"
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleChange}
              placeholder="Meta Title"
              className="mt-2 p-2 w-full border rounded"
            />
            <textarea
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              placeholder="Meta Description"
              className="mt-2 p-2 w-full border rounded"
            />
            <input
              type="text"
              name="metaKeywords"
              value={formData.metaKeywords}
              onChange={handleChange}
              placeholder="Meta Keywords"
              className="mt-2 p-2 w-full border rounded"
            />
            <div className="items-center px-4 py-3">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                {category ? "Update Category" : "Add Category"}
              </button>
            </div>
          </form>
          <button
            onClick={onClose}
            className="mt-3 px-4 py-2 bg-gray-300 text-black text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
