const express = require("express");
const {
  listUsersByRoleController,
} = require("../controllers/moderator.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const router = express.Router();

// list of all role with User only || GET || /api/v1/moderator/users
router.get(
  "/users",
  authMiddleware,
  roleMiddleware("Moderator"),
  listUsersByRoleController
);

module.exports = router;
