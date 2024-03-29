// Import necessary packages and modules
const express = require("express"); // Importing the Express framework
const router = express.Router(); // Creating a router instance
const searchController = require("../Controllers/SearchControllers"); // Importing the search controller module

// Route to search contacts by number
router.get("/searchbynumber", searchController.searchByNumber);

// Route to search contacts by name
router.get("/searchbyname", searchController.searchByName);

module.exports = router; // Exporting the router for use in other modules
