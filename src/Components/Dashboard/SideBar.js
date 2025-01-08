"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Settings,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
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
      title: "Tags",
      icon: FileText,
      href: "/dashboard/tags",
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
      title: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },

    {
      title: "Gallery",
      icon: GalleryHorizontalIcon,
      href: "/dashboard/gallery",
    },
  ];

  return (
    <div
      className={`bg-gray-800 text-white fixed h-full ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="flex justify-between items-center p-4">
        <h2 className={`text-xl font-bold ${isOpen ? "block" : "hidden"}`}>
          Admin Dashboard
        </h2>
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-full hover:bg-gray-700"
        >
          {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
      </div>
      <nav className="mt-6">
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
              <Icon className="h-5 w-5" />
              {isOpen && <span className="ml-3">{item.title}</span>}
            </Link>
          );
        })}
        <button className="flex items-center px-4 py-3 text-gray-400 hover:bg-gray-700 hover:text-white w-full">
          <LogOut className="h-5 w-5" />
          {isOpen && <span className="ml-3">Logout</span>}
        </button>
      </nav>
    </div>
  );
}
