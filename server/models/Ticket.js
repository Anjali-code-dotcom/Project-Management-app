const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: "Open" },
  priority: { type: String, default: "Medium" },
  assignedTo: { type: String, default: "Unassigned" }, // ✅ NEW
  createdAt: { type: Date, default: Date.now }         // ✅ already
});

module.exports = mongoose.model("Ticket", ticketSchema);