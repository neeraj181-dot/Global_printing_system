require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Error:", err.message));

// Test Route
app.get("/", (req, res) => {
  res.send("Backend Running...");
});

// Auth Routes
app.use("/api/auth", authRoutes);

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});