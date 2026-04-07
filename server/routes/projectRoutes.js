// server/routes/projectRoutes.js

const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
  addMember,
  removeMember,
} = require("../controllers/projectController");

// ✅ ALL ROUTES PROTECTED

// CREATE
router.post("/", authMiddleware, createProject);

// LIST ALL
router.get("/", authMiddleware, getProjects);

// UPDATE
router.put("/:id", authMiddleware, updateProject);

// DELETE
router.delete("/:id", authMiddleware, deleteProject);

// ADD MEMBER (via email)
router.post("/:projectId/members", authMiddleware, addMember);

// REMOVE MEMBER
router.delete("/:projectId/members/:userId", authMiddleware, removeMember);

module.exports = router;