// server/controllers/ticketController.js

const Ticket = require("../models/Ticket");

// ✅ CREATE TICKET
exports.createTicket = async (req, res) => {
  try {
    const { title, description, priority, projectId } = req.body;

    const ticket = await Ticket.create({
      title,
      description,
      priority,
      projectId,
    });

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ LIST TICKETS BY PROJECT
exports.getTicketsByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const tickets = await Ticket.find({ projectId })
      .populate("assignee")
      .populate("projectId");

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE TICKET
exports.updateTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTicket = await Ticket.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json(updatedTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ DELETE TICKET
exports.deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    await Ticket.findByIdAndDelete(id);

    res.json({ message: "Ticket deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ ASSIGN TICKET
exports.assignTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      id,
      { assignee: userId },
      { new: true }
    ).populate("assignee");

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};