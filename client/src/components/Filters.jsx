import { useState, useEffect } from "react";

const Filters = ({ setFilteredTickets }) => {
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [assignee, setAssignee] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false); // ✅ FIXED

  useEffect(() => {
    const fetchFiltered = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();

        if (status) params.append("status", status);
        if (priority) params.append("priority", priority);
        if (assignee) params.append("assignee", assignee);
        if (search) params.append("search", search);

        const token = localStorage.getItem("token"); // ✅ IMPORTANT

        const res = await fetch(
          `http://localhost:5000/api/tickets?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ FIX 401
            },
          }
        );

        const data = await res.json();
        setFilteredTickets(data);
      } catch (err) {
        console.error("Filter API error:", err);
      } finally {
        setLoading(false); // ✅ FIXED
      }
    };

    fetchFiltered();
  }, [status, priority, assignee, search]);

  return (
    <div className="w-full bg-white shadow-md rounded-2xl p-4 mb-5">

      {/* Top Row */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search tickets..."
          className="w-full md:w-1/3 border px-4 py-2 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-3">

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-3 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">All Status</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="px-3 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <select
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            className="px-3 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">All Assignee</option>
            <option value="John">John</option>
            <option value="Anjali">Anjali</option>
          </select>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center mt-4">
          <div className="w-6 h-6 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default Filters;