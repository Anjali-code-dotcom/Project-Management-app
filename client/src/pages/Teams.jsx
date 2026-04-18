import React from "react";
import { Users, UserPlus, Mail } from "lucide-react";

const Teams = () => {
  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
        Teams 👥
      </h1>
      <p className="text-gray-600 mt-1">
        Manage your project teams and members
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">

        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
          <Users className="text-blue-500" />
          <div>
            <p className="text-gray-500 text-sm">Total Teams</p>
            <h2 className="text-xl font-bold">5</h2>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
          <UserPlus className="text-green-500" />
          <div>
            <p className="text-gray-500 text-sm">Active Members</p>
            <h2 className="text-xl font-bold">24</h2>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
          <Mail className="text-purple-500" />
          <div>
            <p className="text-gray-500 text-sm">Invites Sent</p>
            <h2 className="text-xl font-bold">8</h2>
          </div>
        </div>

      </div>

      {/* Teams List */}
      <div className="bg-white mt-6 p-4 md:p-6 rounded-xl shadow">

        <h2 className="text-lg font-semibold mb-4">Team Members</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">

            <thead>
              <tr className="border-b text-gray-600">
                <th className="py-2">Name</th>
                <th className="py-2">Role</th>
                <th className="py-2">Email</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>

            <tbody>

              <tr className="border-b">
                <td className="py-3">Anjali</td>
                <td>Frontend Developer</td>
                <td>anjali@gmail.com</td>
                <td className="text-green-500">Active</td>
              </tr>

              <tr className="border-b">
                <td className="py-3">Rahul</td>
                <td>Backend Developer</td>
                <td>rahul@gmail.com</td>
                <td className="text-green-500">Active</td>
              </tr>

              <tr className="border-b">
                <td className="py-3">Aman</td>
                <td>UI/UX Designer</td>
                <td>aman@gmail.com</td>
                <td className="text-yellow-500">Pending</td>
              </tr>

            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
};

export default Teams;