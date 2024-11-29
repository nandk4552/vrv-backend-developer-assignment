const userModel = require("../models/user.model");

// list of all users with the "User" role (Moderator only) controller
const listUsersByRoleController = async (req, res) => {
  try {
    const users = await userModel.find({ role: "User" }).select("-password");
    res.status(200).send({
      success: true,
      totalLength: users.length,
      users,
    });
  } catch (error) {
    console.log("Error in list users by role:" + error.message);
    res
      .status(500)
      .send({ success: false, message: "Something went wrong", error });
  }
};

module.exports = {
  listUsersByRoleController,
};
