"use client";

import { useState } from "react";
import Sidebar from "@/Components/Dashboard/SideBar";

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main
        className={`flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="container mx-auto px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
