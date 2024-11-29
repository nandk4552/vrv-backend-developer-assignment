const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const generateOTP = require("../utils/helper");
const { sendEmail } = require("../utils/emailService");

const JWT_SECRET = process.env.JWT_SECRET;

// register user controller
const registerUserController = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(404).send({
      success: false,
      message: "Provide all fields",
    });
  }
  try {
    // check if email already exists (unique)
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Generate OTP
    const otp = generateOTP().toString();

    // create a new user
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role,
      otp,
    });

    // send otp to users email
    await sendEmail(email, "Verify Your Email", `Your OTP is: ${otp}`);

    user.password = undefined;
    res
      .status(201)

      .send({
        success: true,
        message: "User registered successfully. Please verify your email.",
        user,
      });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in register user API",
      error: error.message,
    });
  }
};

// login user controller
const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .send({ success: false, error: "Provide all fields" });
  }
  try {
    // find the user by email (unique) field
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // check if the user is verified
    if (!user.isVerified) {
      return res.status(403).json({ error: "Please verify your email first" });
    }

    // check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // generate jwt token valid for 7days
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({ success: true, token, message: "Login successful" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login user api" + error.message,
      error: "Something went wrong, please try again",
    });
  }
};
// verify user by otp
const verifyUserController = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ error: "Provide email and OTP" });
  }
  try {
    // find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // check otp
    if (user.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // mark as verified
    user.isVerified = true;
    user.otp = undefined; // clear OTP after verification
    await user.save();

    res.status(200).send({
      success: true,
      message: "Email verified successfully. You can now log in.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong, please try again" });
  }
};
module.exports = {
  registerUserController,
  loginUserController,
  verifyUserController,
};
