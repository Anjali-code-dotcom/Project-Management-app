import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

const projects = [
  { id: 1, name: "Bug Tracker" },
  { id: 2, name: "E-commerce App" },
  { id: 3, name: "Portfolio Website" },
];

function ProjectSelector() {
  const [selected, setSelected] = useState(projects[0]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative w-full sm:w-64"
    >
      {/* Selected Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-2.5 bg-white border rounded-xl shadow-sm hover:shadow-md transition text-gray-700"
      >
        <span className="truncate font-medium">
          {selected.name}
        </span>

        <ChevronDown
          size={18}
          className={`transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 mt-2 w-full bg-white border rounded-xl shadow-lg z-50 overflow-hidden animate-fadeIn">

          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => {
                setSelected(project);
                setOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-indigo-50 transition ${
                selected.id === project.id
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-700"
              }`}
            >
              <span className="truncate">{project.name}</span>

              {selected.id === project.id && (
                <Check size={16} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectSelector;