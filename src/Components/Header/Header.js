"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="text-gray-600 hover:text-red-600">
              Login
            </Link>
            <Link href="/register" className="text-gray-600 hover:text-red-600">
              Register
            </Link>
          </div>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Navigation */}
        <nav className={`${isMenuOpen ? "block" : "hidden"} md:block pb-4`}>
          <ul className="flex flex-col md:flex-row md:items-center md:space-x-6">
            {categories.map((category) => (
              <li key={category.name}>
                <Link
                  href={category.href}
                  className="block py-2 text-gray-700 hover:text-red-600"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
