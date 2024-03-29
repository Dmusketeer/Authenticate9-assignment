const express = require("express");
const router = express.Router();
const contactController = require("../Controllers/ContactControllers");

// Route to add a new contact
router.post("/addcontact", contactController.addContact);

// Route to get all contacts
router.get("/allcontacts", contactController.allContacts);

module.exports = router;
