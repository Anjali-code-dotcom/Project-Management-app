const User = require("../models/User");
const Project = require("../models/Project");
const sendEmail = require("../utils/sendEmail");
// ✅ CREATE PROJECT
exports.createProject = async (req, res) => {
  try {
    const { title, description, teamMembers } = req.body;

    const project = await Project.create({
      title,
      description,
      teamMembers,
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET ALL PROJECTS (LIST)
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("teamMembers");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE PROJECT
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ DELETE PROJECT
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    await Project.findByIdAndDelete(id);

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.addMember = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { email } = req.body;

    // find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const project = await Project.findById(projectId);

    // check already exists
    if (project.teamMembers.includes(user._id)) {
      return res.status(400).json({ message: "User already in project" });
    }
    await sendEmail(
  email,
  "Project Invitation",
  "You have been added to a project!"
);
    project.teamMembers.push(user._id);
    await project.save();

    res.json({ message: "Member added", project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.removeMember = async (req, res) => {
  try {
    const { projectId, userId } = req.params;

    const project = await Project.findById(projectId);

    project.teamMembers = project.teamMembers.filter(
      (id) => id.toString() !== userId
    );

    await project.save();

    res.json({ message: "Member removed", project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};