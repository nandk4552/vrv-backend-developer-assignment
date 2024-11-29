const mongoose = require("mongoose");
const colors = require("colors");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB Connected: ${mongoose.connection.host}`.bgGreen.bold.black
    );
  } catch (error) {
    console.error(`${error.message}`.bgRed.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
