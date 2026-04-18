import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Menu } from "lucide-react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Breadcrumbs from "./Breadcrumbs";

function Layout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex h-screen w-full bg-gray-100">

      {/* 🔹 Sidebar (Desktop) */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* 🔹 Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">

          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Drawer */}
          <div className="relative z-50 w-64 bg-gray-900 text-white">
            <Sidebar />
          </div>

        </div>
      )}

      {/* 🔹 Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <div className="sticky top-0 z-40 bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">

            {/* Mobile Menu */}
            <button
              className="md:hidden text-gray-600"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>

            <Navbar logout={logout} />

          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">

          {/* Breadcrumbs */}
          <Breadcrumbs />

          {/* Routed Pages */}
          <div className="mt-4">
            <Outlet />
          </div>

        </div>

      </div>
    </div>
  );
}

export default Layout;