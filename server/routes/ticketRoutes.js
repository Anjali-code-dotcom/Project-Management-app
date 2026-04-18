const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");

const auth = require("../middleware/auth");
const checkRole = require("../middleware/role");


// ✅ CREATE Ticket
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, status, priority, assignee } = req.body;

    const ticket = await Ticket.create({
      title,
      description,
      status,
      priority,
      assignee,
    });

    res.status(201).json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating ticket" });
  }
});


// ✅ GET Tickets (with filters + search)
router.get("/", auth, async (req, res) => {
  try {
    const { status, priority, assignee, search } = req.query;

    let query = {};

    // 🎯 Filters
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (assignee) query.assignee = assignee;

    // 🔍 Search
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const tickets = await Ticket.find(query).sort({ createdAt: -1 });

    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching tickets" });
  }
});


// ✅ GET Single Ticket
router.get("/:id", auth, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: "Error fetching ticket" });
  }
});


// ✏️ UPDATE Ticket (admin + user)
router.put("/:id", auth, checkRole("admin", "user"), async (req, res) => {
  try {
    const updated = await Ticket.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating ticket" });
  }
});


// ❌ DELETE Ticket (admin only)
router.delete("/:id", auth, checkRole("admin"), async (req, res) => {
  try {
    const deleted = await Ticket.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json({ message: "Ticket deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting ticket" });
  }
});


module.exports = router;