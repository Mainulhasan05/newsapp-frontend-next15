import { useState } from "react";
import { X, Copy, Search } from "lucide-react";
import ImageUploadModal from "./ImageUploadModal ";
import toast from "react-hot-toast";

export default function ImageGalleryModal({ isOpen, onClose, images }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Image URL copied to clipboard!");
      onClose();
    });
  };

  const filteredImages = images.filter(
    (image) =>
      image?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image?.tags.some((tag) =>
        tag?.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">All Images</h2>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600 transition-colors"
          >
            Upload Image
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="Search images..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 pl-10 border rounded-md"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <div
              key={image._id}
              className="bg-gray-100 rounded-lg overflow-hidden"
            >
              <img
                src={image.imageUrl}
                alt={image.title}
                className="w-full h-32 object-cover"
              />
              <div className="p-2">
                <h3 className="font-semibold text-sm mb-1 truncate">
                  {image.title}
                </h3>
                <button
                  onClick={() => copyToClipboard(image.imageUrl)}
                  className="text-blue-500 hover:text-blue-600 text-sm flex items-center"
                >
                  <Copy size={14} className="mr-1" /> Copy URL
                </button>
              </div>
            </div>
          ))}
        </div>
        <ImageUploadModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
        />
      </div>
    </div>
  );
}
