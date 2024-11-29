const express = require("express");
const {
  viewProfileController,
  updateProfileController,
} = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const validate = require("../utils/validate");
const { z } = require("zod");

const router = express.Router();

// zod schema for updating the user profile
const updateProfileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
});

// get loggedin users profile for all roles
router.get("/profile", authMiddleware, viewProfileController);

// update the profile info name and password only for logged in users for all roles
router.put(
  "/update",
  authMiddleware,
  validate({ body: updateProfileSchema }),
  updateProfileController
);

module.exports = router;
