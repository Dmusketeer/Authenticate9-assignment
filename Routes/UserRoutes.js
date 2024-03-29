// Import necessary packages and modules
const express = require("express"); // Express framework
const router = express.Router(); // Router instance
const userController = require("../Controllers/UserControllers"); // User controller module
const { isAuthorized } = require("../Middleware/authMiddleware");

// Define user routes
router.post("/register", userController.register); // Route for user registration
router.post("/login", userController.login); // Route for user login
router.get("/allusers", isAuthorized, userController.allUsers); // Route for fetching all users

// Export router for use in other modules
module.exports = router;
