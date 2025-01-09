"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGalleryImages,
  deleteImage,
} from "@/store/features/gallery/gallerySlice";
import ImageUploadModal from "@/Components/Gallery/ImageUploadModal ";
import ImageGalleryModal from "@/Components/Gallery/ImageGalleryModal";
import { Trash2, Copy, ImageIcon } from "lucide-react";
import toast from "react-hot-toast";

export default function GalleryPage() {
  const dispatch = useDispatch();
  const { images, loading, error } = useSelector((state) => state.gallery);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

  useEffect(() => {
    if (images.length === 0) dispatch(fetchGalleryImages());
  }, [dispatch]);

  const handleDelete = async (imageId) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      await dispatch(deleteImage(imageId));
      toast.success("Image deleted successfully!");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Image URL copied to clipboard!");
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <div
            key={image._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={image.imageUrl}
              alt={image.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{image.title}</h2>
              <p className="text-gray-600 mb-2">{image.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  <ImageIcon className="inline-block mr-1" size={16} />
                  {image.associatedArticles.length} article(s)
                </span>
                <div>
                  <button
                    onClick={() => copyToClipboard(image.imageUrl)}
                    className="text-blue-500 mr-2 hover:text-blue-600"
                    title="Copy Image URL"
                  >
                    <Copy size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(image._id)}
                    className="text-red-500 hover:text-red-600"
                    title="Delete Image"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

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
  );
}
