import React, { useState } from "react";

const NewTicket = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Low",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Ticket Created:", form);
    alert("Ticket Created Successfully 🚀");

    setForm({
      title: "",
      description: "",
      priority: "Low",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 flex justify-center items-start">

      <div className="w-full max-w-2xl bg-white rounded-xl shadow p-5 md:p-8">

        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Create New Ticket 🎫
        </h1>
        <p className="text-gray-500 mt-1">
          Fill the details to create a new task or issue
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">

          {/* Title */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Ticket Title
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter ticket title"
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter ticket description"
              rows="4"
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Priority */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">

            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Create Ticket
            </button>

            <button
              type="reset"
              onClick={() =>
                setForm({ title: "", description: "", priority: "Low" })
              }
              className="w-full sm:w-auto bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition"
            >
              Reset
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default NewTicket;