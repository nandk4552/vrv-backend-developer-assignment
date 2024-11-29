const express = require("express");
const { z } = require("zod");
const validate = require("../utils/validate");
const {
  registerUserController,
  loginUserController,
  verifyUserController,
} = require("../controllers/auth.controller");

const router = express.Router();

// register user || POST || /api/v1/auth/register
router.post(
  "/register",
  validate({
    body: z.object({
      name: z.string().min(3, "Name must be at least 3 characters long"),
      email: z
        .string()
        .email("Invalid email format")
        .min(5, "Email must be at least 5 characters long"),
      password: z
        .string()
        .min(6, "Password must be at least 6 characters long"),
      role: z.enum(["Admin", "User", "Moderator"]).optional(),
    }),
  }),
  registerUserController
);

// login user || POST || /api/v1/auth/login
router.post(
  "/login",
  validate({
    body: z.object({
      email: z.string().email("Invalid email format"),
      password: z
        .string()
        .min(6, "Password m ust be at least 6 characters long"),
    }),
  }),
  loginUserController
);

// verify user by otp using email || POST || /api/v1/auth/verify
router.post(
  "/verify",
  validate({
    body: z.object({
      email: z.string().email("Invalid email format"),
      otp: z.string().length(4, "OTP must be 4 digits long"),
    }),
  }),
  verifyUserController
);
module.exports = router;
