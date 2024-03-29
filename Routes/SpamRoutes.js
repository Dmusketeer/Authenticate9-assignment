const express = require("express");
const router = express.Router();
const spamController = require("../Controllers/SpamControllers.js");

// Route to add a phone number to the spam list
router.post("/addspam", spamController.addSpam);

// Route to get all spam numbers along with the count of users reported each number
router.get("/allspamnumber", spamController.allSpamNumbers);

// Route to get all spam numbers reported by a specific user
router.get("/allspamreportedbyuser", spamController.allSpamReportedByUser);

module.exports = router;
