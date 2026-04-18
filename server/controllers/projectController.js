const User = require("../models/User");
const Project = require("../models/Project");
const sendEmail = require("../utils/sendEmail");


// ================= CREATE PROJECT =================
exports.createProject = async (req, res) => {
  try {
    const { title, description, teamMembers } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const project = await Project.create({
      title,
      description,
      teamMembers: teamMembers || [],
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("CREATE PROJECT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


// ================= GET ALL PROJECTS =================
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("teamMembers", "name email");
    res.json(projects);
  } catch (error) {
    console.error("GET PROJECTS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


// ================= UPDATE PROJECT =================
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json(updatedProject);
  } catch (error) {
    console.error("UPDATE PROJECT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


// ================= DELETE PROJECT =================
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await project.deleteOne();

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("DELETE PROJECT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


// ================= ADD MEMBER =================
exports.addMember = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // prevent duplicate
    if (project.teamMembers.includes(user._id)) {
      return res.status(400).json({ message: "User already in project" });
    }

    project.teamMembers.push(user._id);
    await project.save();

    // 📧 send email (optional safe)
    try {
      await sendEmail(
        email,
        "Project Invitation",
        `You have been added to project: ${project.title}`
      );
    } catch (err) {
      console.log("Email failed:", err.message);
    }

    res.json({ message: "Member added", project });

  } catch (error) {
    console.error("ADD MEMBER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


// ================= REMOVE MEMBER =================
exports.removeMember = async (req, res) => {
  try {
    const { projectId, userId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.teamMembers = project.teamMembers.filter(
      (id) => id.toString() !== userId
    );

    await project.save();

    res.json({ message: "Member removed", project });

  } catch (error) {
    console.error("REMOVE MEMBER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};