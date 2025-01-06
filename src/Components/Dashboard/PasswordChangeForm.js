import { useState } from "react";
import toast from "react-hot-toast";

export default function PasswordChangeForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }
    onSubmit({
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="currentPassword"
        >
          Current Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="currentPassword"
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="newPassword"
        >
          New Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="newPassword"
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="confirmNewPassword"
        >
          Confirm New Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="confirmNewPassword"
          type="password"
          name="confirmNewPassword"
          value={formData.confirmNewPassword}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Changing Password..." : "Change Password"}
        </button>
      </div>
    </form>
  );
}
