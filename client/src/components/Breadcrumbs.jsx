import React from "react";
import { Link, useLocation } from "react-router-dom";

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="w-full mb-5">
      
      {/* Container */}
      <div className="flex flex-wrap items-center gap-2 text-sm bg-white shadow-sm border rounded-xl px-4 py-2">

        {/* Home */}
        <Link
          to="/dashboard"
          className="flex items-center gap-1 text-gray-500 hover:text-indigo-600 transition"
        >
          🏠 <span className="hidden sm:inline">Home</span>
        </Link>

        {/* Dynamic Paths */}
        {pathnames.map((value, index) => {
          const to = "/" + pathnames.slice(0, index + 1).join("/");

          return (
            <React.Fragment key={to}>
              {/* Separator */}
              <span className="text-gray-400">›</span>

              {/* Link */}
              <Link
                to={to}
                className={`capitalize transition ${
                  index === pathnames.length - 1
                    ? "text-indigo-600 font-semibold"
                    : "text-gray-500 hover:text-indigo-600"
                }`}
              >
                {value.replace("-", " ")}
              </Link>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default Breadcrumbs;