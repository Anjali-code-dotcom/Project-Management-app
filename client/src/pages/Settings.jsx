import React, { useState } from "react";

function Settings() {
  const [form, setForm] = useState({
    name: "Anjali",
    email: "anjali@gmail.com",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated:", form);
    alert("Settings updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">

      {/* Container */}
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-5 md:p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            ⚙️ Settings
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your profile and account settings
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm p-5 md:p-6">

          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Profile Information
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">New Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">

              <button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-xl transition active:scale-95 w-full sm:w-auto"
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={() =>
                  setForm({ name: "", email: "", password: "" })
                }
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-xl transition w-full sm:w-auto"
              >
                Reset
              </button>

            </div>
          </form>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl shadow-sm p-5 md:p-6">

          <h2 className="text-lg font-semibold text-red-500 mb-3">
            Danger Zone
          </h2>

          <p className="text-sm text-gray-500 mb-4">
            Once you delete your account, there is no going back.
          </p>

          <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition w-full sm:w-auto">
            Delete Account
          </button>

        </div>

      </div>
    </div>
  );
}

export default Settings;