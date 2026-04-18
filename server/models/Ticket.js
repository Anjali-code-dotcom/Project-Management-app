const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,

    status: {
      type: String,
      enum: ["Open", "In Progress", "Closed"],
      default: "Open",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    assignee: {
      type: String,
      default: "Unassigned",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);