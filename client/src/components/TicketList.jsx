import React, { useEffect, useState } from "react";
import API from "../services/api";

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await API.get("/tickets");
      setTickets(res.data);
    } catch (err) {
      console.error("Error fetching tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6">

      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800 mb-5">
        🎫 Ticket List
      </h2>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : tickets.length === 0 ? (
        <p className="text-center text-gray-500">No tickets found</p>
      ) : (
        <>
          {/* ✅ Desktop Table */}
          <div className="hidden md:block overflow-x-auto bg-white rounded-2xl shadow">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="p-4">ID</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Assignee</th>
                  <th>Created</th>
                </tr>
              </thead>

              <tbody>
                {tickets.map((ticket) => (
                  <tr
                    key={ticket._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-4 text-xs text-gray-500">
                      {ticket._id.slice(-6)}
                    </td>

                    <td className="font-medium text-gray-800">
                      {ticket.title}
                    </td>

                    {/* Status Badge */}
                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          ticket.status === "Open"
                            ? "bg-red-100 text-red-600"
                            : ticket.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </td>

                    <td className="text-gray-600">
                      {ticket.assignedTo || "Unassigned"}
                    </td>

                    <td className="text-gray-500 text-xs">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ✅ Mobile Cards */}
          <div className="md:hidden space-y-4">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-white p-4 rounded-2xl shadow-sm border"
              >
                <h3 className="font-semibold text-gray-800">
                  {ticket.title}
                </h3>

                <div className="mt-2 text-sm text-gray-600 space-y-1">

                  <p>
                    <span className="font-medium">Status:</span>{" "}
                    <span
                      className={
                        ticket.status === "Open"
                          ? "text-red-500"
                          : ticket.status === "In Progress"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }
                    >
                      {ticket.status}
                    </span>
                  </p>

                  <p>
                    <span className="font-medium">Assignee:</span>{" "}
                    {ticket.assignedTo || "Unassigned"}
                  </p>

                  <p className="text-xs text-gray-400">
                    {new Date(ticket.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default TicketList;