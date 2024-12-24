"use client";
import React, { useState } from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black text-white p-4">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Left-side: Logo and Menu Items (Blog, Price) */}
        <div className="flex items-center space-x-6">
          <div className="text-2xl font-bold">Codebit</div>
          <button className="hover:text-gray-400">Blog</button>
          <button className="hover:text-gray-400">Price</button>
        </div>

        {/* Right-side buttons: Signup & Login */}
        <div className="hidden md:flex space-x-6">
          <Link href="/signup" className="hover:text-gray-400">
            Signup
          </Link>
          <Link href="/signin" className="hover:text-gray-400">
            Login
          </Link>
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="md:hidden" onClick={toggleMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
      </div>

      {/* Mobile Menu (Toggle Visibility) */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden mt-4 space-y-4 text-center`}
      >
        <button className="w-full py-2 hover:text-gray-400">Blog</button>
        <button className="w-full py-2 hover:text-gray-400">Price</button>
        <Link href="/signup" className="w-full py-2 hover:text-gray-400 block">
          Signup
        </Link>
        <Link href="/signin" className="w-full py-2 hover:text-gray-400 block">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
