"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/Components/Dashboard/SideBar";
import { Menu } from "lucide-react";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top bar */}
      <div className="bg-white shadow-md p-4 flex justify-between items-center">
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          <Menu size={24} />
        </button>
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          Go to Website
        </Link>
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <main className="w-full">
        <div className="container mx-auto px-4 py-8">{children}</div>
      </main>
    </div>
  );
}
