"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "@/store/features/auth/authSlice";
import UserList from "@/Components/Dashboard/Users/UserList";
import UserRoleModal from "@/Components/Dashboard/Users/UserRoleModal";
import Pagination from "@/Components/Pagination";

export default function UsersPage() {
  const dispatch = useDispatch();
  const { users, totalPages, currentPage, loading, error } = useSelector(
    (state) => state.auth
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (users.length === 0) dispatch(fetchUsers(1));
  }, [dispatch]);

  const handlePageChange = (page) => {
    dispatch(fetchUsers(page));
  };

  const handleAssignRole = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      <UserList users={users} onAssignRole={handleAssignRole} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {isModalOpen && (
        <UserRoleModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </div>
  );
}
