const express = require("express");
const User = require("../Models/User");
const Spam = require("../Models/Spam");
const Contact = require("../Models/Contact");
const { Op, Sequelize } = require("sequelize");

exports.searchByNumber = async (req, res) => {
  const { number } = req.query;
  if (number) {
    try {
      // Get all spam numbers with count
      const spamNumbers = await Spam.findAll({
        attributes: [
          "phoneNumber",
          [Sequelize.fn("COUNT", Sequelize.col("*")), "spamCount"],
        ],
        group: ["phoneNumber"],
      });

      // Create a dictionary of spam numbers with their counts
      const spamNumbersDict = spamNumbers.reduce((acc, spamNumber) => {
        acc[spamNumber.dataValues.phoneNumber] =
          spamNumber.dataValues.spamCount;
        return acc;
      }, {});

      // Check if the number belongs to a registered user
      const registeredUser = await User.findOne({
        where: { phoneNumber: number },
      });
      if (registeredUser) {
        res.json({
          results: [
            {
              name: registeredUser.name,
              phone_number: registeredUser.phoneNumber,
              noOfUsersReportedAsSpam:
                spamNumbersDict[registeredUser.phoneNumber] || 0,
              email: registeredUser.email,
            },
          ],
        });
      } else {
        // Check if the number belongs to any contact
        const contacts = await Contact.findAll({
          attributes: ["name", "phoneNumber"],
          where: { phoneNumber: number },
        });
        if (contacts.length > 0) {
          res.json({
            results: contacts.map((contact) => ({
              name: contact.name,
              phoneNumber: contact.phone_number,
              noOfUsersReportedAsSpam:
                spamNumbersDict[contact.phoneNumber] || 0,
            })),
          });
        } else {
          // Check if the number is marked as spam
          const count = await Spam.count({
            where: { phoneNumber: number },
          });
          if (count > 0) {
            res.json({
              number: number,
              msg: "Number is marked as spam by" + count + " users",
            });
          } else {
            res.json({ err: "No user with this number exists" });
          }
        }
      }
    } catch (error) {
      console.error("Error while searching by number:", error);
      res.status(500).json({ error: "Issue occurred" });
    }
  } else {
    res.status(400).json({ err: "Invalid Request. Number not provided" });
  }
};

exports.searchByName = async (req, res) => {
  const { name } = req.query;
  if (name) {
    try {
      // Find registered users whose names start with provided name
      const registeredUsers1 = await User.findAll({
        attributes: ["name", "PhoneNumber"],
        where: {
          name: {
            [Op.iLike]: name + "%",
          },
        },
      });

      // Find contacts whose names start with provided name
      const contacts1 = await Contact.findAll({
        attributes: ["name", "phoneNumber"],
        where: {
          name: {
            [Op.iLike]: name + "%",
          },
        },
      });

      // Find registered users whose names contain provided name
      const registeredUsers2 = await User.findAll({
        attributes: ["name", "PhoneNumber"],
        where: {
          name: {
            [Op.notILike]: name + "%",
            [Op.iLike]: "%" + name + "%",
          },
        },
      });

      // Find contacts whose names contain provided name
      const contacts2 = await Contact.findAll({
        attributes: ["name", "phoneNumber"],
        where: {
          name: {
            [Op.notILike]: name + "%",
            [Op.iLike]: "%" + name + "%",
          },
        },
      });

      // Find all spam numbers with their counts
      const spamNumbers = await Spam.findAll({
        attributes: [
          "phoneNumber",
          [Sequelize.fn("COUNT", Sequelize.col("*")), "spamCount"],
        ],
        group: ["phoneNumber"],
      });

      // Create a dictionary of spam numbers with their counts
      const spamNumbersDict = spamNumbers.reduce((acc, spamNumber) => {
        acc[spamNumber.dataValues.phoneNumber] =
          spamNumber.dataValues.spamCount;
        return acc;
      }, {});

      // Combine all user and contact results and add spam count
      let namePhoneArray = [];
      registeredUsers1.forEach((user) => {
        if (
          !namePhoneArray.some(
            (obj) =>
              obj.name === user.dataValues.name &&
              obj.phoneNumber === user.dataValues.phoneNumber
          )
        ) {
          namePhoneArray.push({
            name: user.dataValues.name,
            phoneNumber: user.dataValues.phoneNumber,
            spamCount: spamNumbersDict[user.dataValues.phoneNumber] || 0,
          });
        }
      });

      contacts1.forEach((contact) => {
        if (
          !namePhoneArray.some(
            (obj) =>
              obj.name === contact.dataValues.name &&
              obj.phoneNumber === contact.dataValues.phoneNumber
          )
        ) {
          namePhoneArray.push({
            name: contact.dataValues.name,
            phoneNumber: contact.dataValues.phoneNumber,
            spamCount: spamNumbersDict[contact.dataValues.phoneNumber] || 0,
          });
        }
      });

      registeredUsers2.forEach((user) => {
        if (
          !namePhoneArray.some(
            (obj) =>
              obj.name === user.dataValues.name &&
              obj.phoneNumber === user.dataValues.phoneNumber
          )
        ) {
          namePhoneArray.push({
            name: user.dataValues.name,
            phoneNumber: user.dataValues.phoneNumber,
            spamCount: spamNumbersDict[user.dataValues.phoneNumber] || 0,
          });
        }
      });

      contacts2.forEach((contact) => {
        if (
          !namePhoneArray.some(
            (obj) =>
              obj.name === contact.dataValues.name &&
              obj.phoneNumber === contact.dataValues.phoneNumber
          )
        ) {
          namePhoneArray.push({
            name: contact.dataValues.name,
            phoneNumber: contact.dataValues.phoneNumber,
            spamCount: spamNumbersDict[contact.dataValues.phoneNumber] || 0,
          });
        }
      });

      res.status(200).json({ results: namePhoneArray });
    } catch (error) {
      console.error("Error searching by name:", error);
      res.status(500).json({ error: "Issue occurred" });
    }
  } else {
    res.status(400).json({ err: "Invalid Request. Name not provided" });
  }
};
