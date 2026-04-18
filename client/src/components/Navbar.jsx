import React from "react";
import { Menu, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ProjectSelector from "./ProjectSelector";

function Navbar({ toggleSidebar }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white px-4 md:px-6 py-3 flex items-center justify-between shadow-md">

      {/* 🔹 Left Section */}
      <div className="flex items-center gap-3 md:gap-5">

        {/* Mobile Menu */}
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded hover:bg-gray-800 transition"
        >
          <Menu size={22} />
        </button>

        {/* Logo */}
        <h1 className="text-lg md:text-xl font-bold text-blue-400 whitespace-nowrap">
          Project Manager
        </h1>

        {/* Project Selector */}
        <div className="hidden sm:block">
          <ProjectSelector />
        </div>

      </div>

      {/* 🔹 Center Search (Desktop only) */}
      <div className="hidden md:flex items-center bg-gray-800 px-3 py-1 rounded-lg w-64">
        <Search size={16} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none px-2 text-sm w-full"
        />
      </div>

      {/* 🔹 Right Section */}
      <div className="flex items-center gap-3 md:gap-5">

        {/* Navigation Links */}
        <Link
          to="/dashboard"
          className="hidden md:block hover:text-blue-400 transition"
        >
          Dashboard
        </Link>

        <Link
          to="/tickets"
          className="hidden md:block hover:text-blue-400 transition"
        >
          Tickets
        </Link>

        {/* Profile */}
        <img
          src="https://i.pravatar.cc/40"
          alt="user"
          className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-gray-600"
        />

        {/* Logout */}
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-3 md:px-4 py-1 rounded text-sm md:text-base transition"
        >
          Logout
        </button>

      </div>
    </nav>
  );
}

export default Navbar;