const User = require("../models/user.model");

// List all users (Admin only)
const listUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ error: "No users found" });
    }

    res.status(200).send({ success: true, totalLength: users?.length, users });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Assign role to a user (Admin only)
const assignRole = async (req, res) => {
  const { userId, role } = req.body;
  try {
    if (!["Admin", "User", "Moderator"].includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "Role updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  listUsers,
  assignRole,
};
