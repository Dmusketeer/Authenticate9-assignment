const express = require("express");
const router = express.Router();
const contactController = require("../Controllers/ContactControllers");
const { isAuthorized } = require("../Middleware/authMiddleware");

// Route to add a new contact
router.post("/addcontact", isAuthorized, contactController.addContact);

// Route to get all contacts
router.get("/allcontacts", isAuthorized, contactController.allContacts);

module.exports = router;
