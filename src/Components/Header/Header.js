"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Search, X } from "lucide-react";
import { fetchProfile, logout } from "@/store/features/auth/authSlice";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

// Helper function to convert to Bengali numerals
function toBengaliNumerals(number) {
  const bengaliNumerals = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return number.toString().replace(/\d/g, (d) => bengaliNumerals[d]);
}

export default function Header({ categories }) {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      dispatch(fetchProfile());
    }
  }, [dispatch]);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      const dateTimeString = now.toLocaleDateString("bn-BD", options);
      setCurrentDateTime(dateTimeString);
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // const categories = [
  //   { name: "Home", href: "/" },
  //   { name: "Latest News", href: "/latest" },
  //   { name: "Politics", href: "/politics" },
  //   { name: "Business", href: "/business" },
  //   { name: "Sports", href: "/sports" },
  //   { name: "Entertainment", href: "/entertainment" },
  //   { name: "Technology", href: "/technology" },
  // ];

  const handleLogout = () => {
    Cookies.remove("access_token");
    dispatch(logout());
    router.push("/");
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4">
        {/* Logo, title, and date/time */}
        <div className="flex flex-col items-center justify-center py-4">
          <Link href="/" className="text-3xl font-bold text-red-600 mb-2">
            {/* NewsPortal */}
            <Image
              src={"/images/logo.png"}
              alt="NewsPortal"
              width={200}
              height={50}
            />
          </Link>
          <div className="text-sm text-gray-600">{currentDateTime}</div>
        </div>

        {/* Navigation and Auth Links */}
        <div className="flex justify-between items-center py-4">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
          <div
            className={`${isMenuOpen ? "block" : "hidden"} md:block flex-grow`}
          >
            <nav className="space-y-4 md:space-y-0">
              <ul className="flex flex-col md:flex-row md:items-center md:justify-center md:space-x-6">
                {categories?.map((category) => (
                  <li key={category.name}>
                    <Link
                      href={`/category/${category.slug}`}
                      className="block py-2 text-gray-700 hover:text-red-600"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-red-600"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-600"
                >
                  Logout
                </button>
              </>
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
        </div>
      </div>
    </header>
  );
}
