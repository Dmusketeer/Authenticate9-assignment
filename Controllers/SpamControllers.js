const express = require("express");
const User = require("../Models/User");
const Spam = require("../Models/Spam");
const { Sequelize } = require("sequelize");

// Controller function to add a phone number to the spam list
exports.addSpam = async (req, res) => {
  // Extract data from request body
  const { userid, phoneNumber } = req.body;

  // Check if required fields are provided
  if (!(userid && phoneNumber)) {
    return res
      .status(400)
      .json({ err: "Invalid Request. Required fields not provided" });
  }

  try {
    // Find the user by user ID
    const user = await User.findOne({ where: { userId: userid } });

    // If user is not found, return error
    if (!user) {
      return res
        .status(400)
        .json({ err: "Only Registered Users can add phone numbers to spam" });
    }

    // Check if the phone number is already marked as spam by the user
    const spam = await Spam.findOne({
      where: { addedBy: userid, PhoneNumber: phoneNumber },
    });
    if (spam) {
      return res
        .status(400)
        .json({ err: "You Have Already Marked this number as spam" });
    }

    // Create a new entry in the Spam table for the phone number
    await Spam.create({ addedBy: userid, PhoneNumber: phoneNumber });

    // Send success response
    return res
      .status(200)
      .json({ message: "Number is marked as spam successfully" });
  } catch (error) {
    console.error("Error marking number as spam:", error);
    return res.status(500).json({ error: "Issue occurred" });
  }
};

// Controller function to get all spam numbers reported by a specific user
exports.allSpamReportedByUser = async (req, res) => {
  // Extract user ID from request body
  const { userid } = req.body;

  // Check if user ID is provided
  if (!userid) {
    return res
      .status(400)
      .json({ err: "Invalid Request. User ID not provided" });
  }

  try {
    // Find the user by user ID
    const user = await User.findOne({ where: { userId: userid } });

    // If user is not found, return error
    if (!user) {
      return res
        .status(400)
        .json({ err: "Only Registered Users can view spam numbers" });
    }

    // Get all spam numbers reported by the user
    const spamNumbers = await Spam.findAll({ where: { addedBy: userid } });

    // Send success response with the list of spam numbers
    res.status(200).json(spamNumbers);
  } catch (error) {
    console.error("Error fetching spam numbers:", error);
    res.status(500).json({ error: "Issue occurred" });
  }
};

// Controller function to get all spam numbers along with the count of users reported each number
exports.allSpamNumbers = async (req, res) => {
  try {
    // Get all spam numbers and count the number of users reported each number
    const spamNumbers = await Spam.findAll({
      attributes: [
        "PhoneNumber",
        [Sequelize.fn("COUNT", Sequelize.col("*")), "noOfUsersReported"],
      ],
      group: ["PhoneNumber"],
    });

    // Send success response with the list of spam numbers and their counts
    res.status(200).json(spamNumbers);
  } catch (error) {
    console.error("Error fetching all spam numbers:", error);
    res.status(500).json({ error: "Issue occurred" });
  }
};
