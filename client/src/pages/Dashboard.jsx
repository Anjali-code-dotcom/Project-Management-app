import React, { useState, useEffect } from "react";
import { Ticket, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Filters from "../components/Filters";


const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const res = await fetch("http://localhost:5000/api/tickets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        const data = await res.json();

        let ticketsArray = [];
        if (Array.isArray(data)) ticketsArray = data;
        else if (Array.isArray(data.tickets)) ticketsArray = data.tickets;
        else if (Array.isArray(data.data)) ticketsArray = data.data;

        setTickets(ticketsArray);
        setFilteredTickets(ticketsArray);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [navigate]);

  const total = tickets.length;
  const open = tickets.filter((t) => t.status === "Open").length;
  const closed = tickets.filter((t) => t.status === "Closed").length;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3">

        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Dashboard 👋
        </h1>

        <div className="flex gap-3 flex-wrap">

          {/* Settings Button */}
          <button
            onClick={() => navigate("/settings")}
            className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-xl transition active:scale-95"
          >
            ⚙️ Settings
      </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        <StatCard title="Total Tickets" value={total} icon={<Ticket />} color="indigo" />
        <StatCard title="Open" value={open} icon={<Clock />} color="red" />
        <StatCard title="Closed" value={closed} icon={<CheckCircle />} color="green" />

      </div>

      {/* FILTERS */}
      <Filters setFilteredTickets={setFilteredTickets} />

      {/* CONTENT */}
      <div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredTickets.length === 0 ? (
          <p className="text-center text-gray-500">No tickets found</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {filteredTickets.map((t) => (
              <div
                key={t._id}
                className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-lg transition border"
              >
                <h2 className="font-semibold text-lg text-gray-800">
                  {t.title}
                </h2>

                <div className="text-sm text-gray-600 mt-2 space-y-1">
                  <p>
                    Status:{" "}
                    <span className={t.status === "Open" ? "text-red-500" : "text-green-500"}>
                      {t.status}
                    </span>
                  </p>

                  <p>
                    Priority:{" "}
                    <span className="text-indigo-500">{t.priority}</span>
                  </p>
                </div>

                <div className="mt-3 text-right">
                  <button className="text-indigo-500 text-sm hover:underline">
                    View Details →
                  </button>
                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

/* 🔥 Reusable Stat Card */
function StatCard({ title, value, icon, color }) {
  const colors = {
    indigo: "text-indigo-500",
    red: "text-red-500",
    green: "text-green-500",
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-3xl font-bold">{value}</h2>
      </div>
      <div className={colors[color]}>{icon}</div>
    </div>
  );
}

export default Dashboard;