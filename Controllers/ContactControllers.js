const express = require("express"); // Import Express framework
const Contact = require("../Models/Contact"); // Import Contact model
const User = require("../Models/User"); // Import User model

// Controller function to add a contact
exports.addContact = async (req, res) => {
  const { userid, name, phoneNumber, email } = req.body;

  // Check if required fields are provided
  if (!userid || !name || !phoneNumber) {
    return res
      .status(400)
      .json({ err: "Invalid Request. Required fields not provided" });
  }

  try {
    // Check if the contact already exists
    const contact = await Contact.findOne({
      where: { phoneNumber: phoneNumber, isContactOf: userid },
    });

    if (contact) {
      return res.status(400).json({ err: "Contact already exists" });
    }

    // Create a new contact
    await Contact.create({
      isContactOf: userid,
      name,
      PhoneNumber: phoneNumber,
      email,
    });

    // Send success response
    res.status(200).json({ message: "Contact Added Successfully" });
  } catch (error) {
    console.error("Error adding contact:", error);
    res.status(500).json({ err: "Issue occurred" });
  }
};

// Controller function to get all contacts of a user
exports.allContacts = async (req, res) => {
  const { userid } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ where: { userId: userid } });

    if (!user) {
      return res.status(400).json({
        error: "Invalid Request. Only Registered Users can view contacts",
      });
    }

    // Get all contacts of the user
    const contacts = await Contact.findAll({ where: { isContactOf: userid } });

    // Send success response with the list of contacts
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
