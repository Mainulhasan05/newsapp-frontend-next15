import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserRoles, fetchUsers } from "@/store/features/auth/authSlice";

export default function UserRoleModal({ user, onClose }) {
  const dispatch = useDispatch();
  const [selectedRoles, setSelectedRoles] = useState(user.roles);

  const availableRoles = ["reader", "journalist", "editor", "admin"];

  const handleRoleToggle = (role) => {
    setSelectedRoles((prevRoles) =>
      prevRoles.includes(role)
        ? prevRoles.filter((r) => r !== role)
        : [...prevRoles, role]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateUserRoles({ userId: user._id, roles: selectedRoles }));
    dispatch(fetchUsers());
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Assign Roles to {user.name}
          </h3>
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="mt-2 flex flex-col items-start">
              {availableRoles.map((role) => (
                <label key={role} className="inline-flex items-center mt-3">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    checked={selectedRoles.includes(role)}
                    onChange={() => handleRoleToggle(role)}
                  />
                  <span className="ml-2 text-gray-700 capitalize">{role}</span>
                </label>
              ))}
            </div>
            <div className="items-center px-4 py-3">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Update Roles
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
