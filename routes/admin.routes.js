const express = require("express");
const { listUsers, assignRole } = require("../controllers/admin.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const { z } = require("zod");
const validate = require("../utils/validate");

const router = express.Router();

// list all users only for admin role || GET || /api/v1/admin/users
router.get("/users", authMiddleware, roleMiddleware("Admin"), listUsers);

// assign role to a user only for admin || POST || /api/v1/admin/assign-role
router.post(
  "/assign-role",
  authMiddleware,
  roleMiddleware("Admin"),
  validate({
    body: z.object({
      userId: z.string(),
      role: z.enum(["Admin", "User", "Moderator"]),
    }),
  }),
  assignRole
);

module.exports = router;
