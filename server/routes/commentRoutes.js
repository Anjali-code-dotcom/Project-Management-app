const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");


router.post("/", async (req, res) => {
  try {
    const { ticketId, text } = req.body;

    // Validation
    if (!ticketId || !text) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const comment = await Comment.create({
      ticketId,
      userId: "dummyUserId", // replace with auth later
      text,
    });

    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding comment" });
  }
});


router.get("/:ticketId", async (req, res) => {
  try {
    const comments = await Comment.find({
      ticketId: req.params.ticketId,
    }).sort({ createdAt: 1 }); // oldest first

    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching comments" });
  }
});


module.exports = router;