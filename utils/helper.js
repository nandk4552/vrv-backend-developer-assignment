const crypto = require("crypto");

const generateOTP = (length = 4) => {
  if (length <= 0) {
    throw new Error("OTP length must be a positive number");
  }

  // generate a secure random value
  const otp = crypto
    .randomInt(0, Math.pow(10, length))
    .toString()
    // ensure the OTP is of the correct length with leading zeros if neededs
    .padStart(length, "0");

  return otp;
};

module.exports = generateOTP;
