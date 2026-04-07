// server/routes/ticketRoutes.js

const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createTicket,
  getTicketsByProject,
  updateTicket,
  deleteTicket,
  assignTicket,
} = require("../controllers/ticketController");

// ✅ ALL ROUTES PROTECTED

// CREATE
router.post("/", authMiddleware, createTicket);

// LIST BY PROJECT
router.get("/project/:projectId", authMiddleware, getTicketsByProject);

// UPDATE
router.put("/:id", authMiddleware, updateTicket);

// DELETE
router.delete("/:id", authMiddleware, deleteTicket);

// ASSIGN
router.put("/:id/assign", authMiddleware, assignTicket);

module.exports = router;