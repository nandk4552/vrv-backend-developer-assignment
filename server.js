const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const generateOTP = require("./utils/helper");

// ** .env configuration
dotenv.config();
// ** connection to MongoDb
connectDB();

//** rest obj
const app = express();

//** middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//** routes
app.get("/", (req, res) => {
  return res.status(200).send({
    success: true,
    message:
      "Welcome to the VRV Security Backend Server RBAC Assignment By Nand Kishore",
  });
});

// ** routes for auth, admin, user and moderators **
//** auth routes */
app.use("/api/v1/auth", require("./routes/auth.routes"));
app.use("/api/v1/admin", require("./routes/admin.routes"));
app.use("/api/v1/user", require("./routes/user.routes"));
app.use("/api/v1/moderator", require("./routes/moderator.routes"));

//** catch all other routes
app.use((req, res, next) => {
  res.status(404).send("Route not found");
});

//** error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
});

// ** port
const PORT = process.env.PORT || 8080;
// ** server listening
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.yellow.bold);
});
