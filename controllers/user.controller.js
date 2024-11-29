const User = require("../models/user.model");
const bcrypt = require("bcrypt");

// view personal profile of loggedin user controller
const viewProfileController = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.password = undefined;
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
// update the profile of the users name and password only controller
const updateProfileController = async (req, res) => {
  try {
    const { name, password } = req.body;

    // find the user
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // update name and password if changed
    if (name) {
      user.name = name || user.name;
    }
    // update password if provided
    if (password) {
      // check if the new password is already hashed or matches the existing one
      const isSamePassword = await bcrypt.compare(password, user.password);
      if (!isSamePassword) {
        user.password = await bcrypt.hash(password, 10); // hash only if different
      }
    }

    // save the updated user
    await user.save();
    user.password = undefined;
    res
      .status(200)
      .send({ success: true, message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  viewProfileController,
  updateProfileController,
};
