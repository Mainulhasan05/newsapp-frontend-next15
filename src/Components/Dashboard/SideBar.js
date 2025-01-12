"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  LogOut,
  X,
  UserCircle,
  GalleryHorizontalIcon,
} from "lucide-react";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      title: "Articles",
      icon: FileText,
      href: "/dashboard/articles",
    },

    {
      title: "Categories",
      icon: FileText,
      href: "/dashboard/categories",
    },

    {
      title: "Users",
      icon: Users,
      href: "/dashboard/users",
    },
    {
      title: "Profile",
      icon: UserCircle,
      href: "/dashboard/profile",
    },

    {
      title: "Gallery",
      icon: GalleryHorizontalIcon,
      href: "/dashboard/gallery",
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <div className="relative flex flex-col w-64 max-w-full bg-gray-800 text-white">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-full hover:bg-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="flex-grow mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center px-4 py-3 ${
                  pathname === item.href
                    ? "bg-gray-900 text-white"
                    : "text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
        <button className="flex items-center px-4 py-3 text-gray-400 hover:bg-gray-700 hover:text-white w-full">
          <LogOut className="h-5 w-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
