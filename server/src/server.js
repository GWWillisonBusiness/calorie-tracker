const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

const foodRoutes = require("./routes/foodRoutes");
const authRoutes = require("./routes/authRoutes");

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/foods", foodRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API is running Hello Backend!");
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
