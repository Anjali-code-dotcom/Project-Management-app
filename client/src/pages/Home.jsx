import React from "react";
import { Folder, Users, CheckCircle, Clock } from "lucide-react";

const Home = () => {
  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
        Welcome Back 👋
      </h1>
      <p className="text-gray-600 mt-1">
        Here’s your project overview
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
          <Folder className="text-blue-500" />
          <div>
            <p className="text-gray-500 text-sm">Projects</p>
            <h2 className="text-xl font-bold">12</h2>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
          <Users className="text-green-500" />
          <div>
            <p className="text-gray-500 text-sm">Teams</p>
            <h2 className="text-xl font-bold">5</h2>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
          <CheckCircle className="text-purple-500" />
          <div>
            <p className="text-gray-500 text-sm">Completed</p>
            <h2 className="text-xl font-bold">8</h2>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
          <Clock className="text-orange-500" />
          <div>
            <p className="text-gray-500 text-sm">Pending</p>
            <h2 className="text-xl font-bold">4</h2>
          </div>
        </div>

      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">

        {/* Recent Projects */}
        <div className="lg:col-span-2 bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-3">Recent Projects</h2>

          <div className="space-y-3">

            <div className="p-3 border rounded-lg flex justify-between">
              <span>Bug Tracker App</span>
              <span className="text-green-500 text-sm">Active</span>
            </div>

            <div className="p-3 border rounded-lg flex justify-between">
              <span>Portfolio Website</span>
              <span className="text-yellow-500 text-sm">Pending</span>
            </div>

            <div className="p-3 border rounded-lg flex justify-between">
              <span>E-commerce Dashboard</span>
              <span className="text-green-500 text-sm">Active</span>
            </div>

          </div>
        </div>

        {/* Activity Panel */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-3">Activity</h2>

          <ul className="space-y-3 text-sm text-gray-600">

            <li>✔ New project created</li>
            <li>✔ Team updated</li>
            <li>✔ Bug fixed in dashboard</li>
            <li>✔ Task assigned to user</li>

          </ul>
        </div>

      </div>

    </div>
  );
};

export default Home;