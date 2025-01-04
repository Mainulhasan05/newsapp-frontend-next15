"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Settings,
  Users,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
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
      title: "Users",
      icon: Users,
      href: "/dashboard/users",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 text-white">
      <div className="p-4">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
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
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.title}
            </Link>
          );
        })}
        <button className="flex items-center px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white w-full">
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
      </nav>
    </div>
  );
}
