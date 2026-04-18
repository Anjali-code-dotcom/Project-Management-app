import React from "react";
import { Home, Folder, Users, Settings, PlusCircle } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const baseClass =
    "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200";

  return (
    <div className="h-full w-64 bg-gray-900 text-white flex flex-col border-r border-gray-800">

      {/* Logo */}
      <div className="p-5 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-blue-400">
          PM Tool
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 flex flex-col gap-2">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${baseClass} ${
              isActive ? "bg-gray-700" : "hover:bg-gray-800"
            }`
          }
        >
          <Home size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `${baseClass} ${
              isActive ? "bg-gray-700" : "hover:bg-gray-800"
            }`
          }
        >
          <Folder size={20} />
          Projects
        </NavLink>

        <NavLink
          to="/teams"
          className={({ isActive }) =>
            `${baseClass} ${
              isActive ? "bg-gray-700" : "hover:bg-gray-800"
            }`
          }
        >
          <Users size={20} />
          Teams
        </NavLink>

        <NavLink
          to="/tickets/new"
          className={({ isActive }) =>
            `${baseClass} ${
              isActive ? "bg-gray-700" : "hover:bg-gray-800"
            }`
          }
        >
          <PlusCircle size={20} />
          New Ticket
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `${baseClass} ${
              isActive ? "bg-gray-700" : "hover:bg-gray-800"
            }`
          }
        >
          <Settings size={20} />
          Settings
        </NavLink>

      </nav>

      {/* Footer spacing fix */}
      <div className="p-4 border-t border-gray-800 text-xs text-gray-400">
        © 2026 PM Tool
      </div>

    </div>
  );
};

export default Sidebar;