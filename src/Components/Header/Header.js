"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { useSelector } from "react-redux";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const categories = [
    { name: "Home", href: "/" },
    { name: "Latest News", href: "/latest" },
    { name: "Politics", href: "/politics" },
    { name: "Business", href: "/business" },
    { name: "Sports", href: "/sports" },
    { name: "Entertainment", href: "/entertainment" },
    { name: "Technology", href: "/technology" },
  ];

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4">
        {/* Logo and top bar */}
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-3xl font-bold text-red-600">
            NewsPortal
          </Link>
          <div className="flex items-center space-x-4">
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Navigation and Auth Links */}
        <div className={`${isMenuOpen ? "block" : "hidden"} md:block pb-4`}>
          <nav className="space-y-4 md:space-y-0">
            <ul className="flex flex-col md:flex-row md:items-center md:space-x-6">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={"/category" + category.href}
                    className="block py-2 text-gray-700 hover:text-red-600"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 pt-4 md:pt-0 border-t md:border-0">
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-red-600"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-600 hover:text-red-600"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="text-gray-600 hover:text-red-600"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
