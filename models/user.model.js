const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "name is required!"] },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "User",
      enum: ["Admin", "User", "Moderator"],
    },
    isVerified: { type: Boolean, default: false }, // for email verification status
    otp: { type: String }, // OTP for email verification or password reset
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
