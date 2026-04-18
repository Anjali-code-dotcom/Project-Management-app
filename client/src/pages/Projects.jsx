import React from "react";
import { Folder, Clock, CheckCircle, AlertCircle } from "lucide-react";

const Projects = () => {
  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
        Projects 📁
      </h1>
      <p className="text-gray-600 mt-1">
        Manage and track all your projects
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
          <Folder className="text-blue-500" />
          <div>
            <p className="text-gray-500 text-sm">Total Projects</p>
            <h2 className="text-xl font-bold">12</h2>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
          <CheckCircle className="text-green-500" />
          <div>
            <p className="text-gray-500 text-sm">Completed</p>
            <h2 className="text-xl font-bold">7</h2>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
          <Clock className="text-yellow-500" />
          <div>
            <p className="text-gray-500 text-sm">In Progress</p>
            <h2 className="text-xl font-bold">3</h2>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
          <AlertCircle className="text-red-500" />
          <div>
            <p className="text-gray-500 text-sm">Pending</p>
            <h2 className="text-xl font-bold">2</h2>
          </div>
        </div>

      </div>

      {/* Projects List */}
      <div className="bg-white mt-6 p-4 md:p-6 rounded-xl shadow">

        <h2 className="text-lg font-semibold mb-4">Project List</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Card 1 */}
          <div className="border rounded-xl p-4 hover:shadow-md transition">
            <h3 className="font-semibold text-lg">Bug Tracker App</h3>
            <p className="text-gray-500 text-sm mt-1">
              Track and manage software bugs efficiently
            </p>
            <div className="mt-3 text-green-500 text-sm">Active</div>
          </div>

          {/* Card 2 */}
          <div className="border rounded-xl p-4 hover:shadow-md transition">
            <h3 className="font-semibold text-lg">Portfolio Website</h3>
            <p className="text-gray-500 text-sm mt-1">
              Personal developer portfolio
            </p>
            <div className="mt-3 text-yellow-500 text-sm">In Progress</div>
          </div>

          {/* Card 3 */}
          <div className="border rounded-xl p-4 hover:shadow-md transition">
            <h3 className="font-semibold text-lg">E-commerce Dashboard</h3>
            <p className="text-gray-500 text-sm mt-1">
              Admin panel for online store
            </p>
            <div className="mt-3 text-green-500 text-sm">Active</div>
          </div>

          {/* Card 4 */}
          <div className="border rounded-xl p-4 hover:shadow-md transition">
            <h3 className="font-semibold text-lg">Chat Application</h3>
            <p className="text-gray-500 text-sm mt-1">
              Real-time messaging app
            </p>
            <div className="mt-3 text-red-500 text-sm">Pending</div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Projects;