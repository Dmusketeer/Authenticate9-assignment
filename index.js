// Import necessary packages and modules
const express = require("express"); // Express framework
const bodyParser = require("body-parser"); // Middleware for parsing request bodies
require("dotenv").config(); // Load environment variables
const { sequelize } = require("./config/config.js"); // Sequelize instance for database connection
const userRoutes = require("./Routes/UserRoutes.js"); // User routes
const spamRoutes = require("./Routes/SpamRoutes"); // Spam routes
const searchRoutes = require("./Routes/SearchRoutes"); // Search routes
const contactRoutes = require("./Routes/ContactRoutes"); // Contact routes
const generateRandomData = require("./config/generateRandomData.js"); // Generate random data

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 3000; // Port number

// Middleware setup
app.use(bodyParser.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded requests

// Define route handlers
app.use("/api/v1/user", userRoutes); // User routes
app.use("/api/v1/contact", contactRoutes); // Contact routes
app.use("/api/v1/spam", spamRoutes); // Spam routes
app.use("/api/v1/search", searchRoutes); // Search routes

// Database synchronization and server initialization
sequelize
  .sync() // Sync database models
  .then(async () => {
    console.log("Database Connected sucessfully."); // Log success message
    // uncomment to Populate database with random sample data
    generateRandomData;
    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`); // Log server start message
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error); // Log database connection error
  });
