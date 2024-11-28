const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  return res.status(200).send({
    success: true,
    message: "Welcome to the VRV Security Backend Server Assignment",
  });
});


// ** error handling middleware **
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
