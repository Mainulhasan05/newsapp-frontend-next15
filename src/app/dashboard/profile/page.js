"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProfileForm from "@/Components/Dashboard/ProfileForm";
import PasswordChangeForm from "@/Components/Dashboard/PasswordChangeForm";
import {
  updateUserProfile,
  changeUserPassword,
} from "@/store/features/auth/authSlice";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleProfileUpdate = async (updatedProfile) => {
    setIsUpdating(true);
    try {
      await dispatch(updateUserProfile(updatedProfile)).unwrap();
      // Show success message
    } catch (error) {
      // Show error message
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordChange = async (passwordData) => {
    setIsChangingPassword(true);
    try {
      await dispatch(changeUserPassword(passwordData)).unwrap();
      // Show success message
    } catch (error) {
      // Show error message
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">User Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProfileForm
          user={user}
          onSubmit={handleProfileUpdate}
          isLoading={isUpdating}
        />
        <PasswordChangeForm
          onSubmit={handlePasswordChange}
          isLoading={isChangingPassword}
        />
      </div>
    </div>
  );
}
