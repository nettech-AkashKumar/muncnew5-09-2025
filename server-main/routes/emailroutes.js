const express = require("express");
const {
    sendEmail,
    receiveEmail,
    getSentEmails,
    getInboxCount,
    readInboxEmails,
    deleteEmail,
    getStarredEmails,
    starredEmail,
    getDeletedEmails,
    permanentDeleteEmails,
} = require("../controllers/emailcontroller.js");
const emailrouter = express.Router();
const upload = require("../config/upload.js");
const { verifyToken } = require("../middleware/auth/authMiddleware.js");

emailrouter.post(
    "/send",
    verifyToken,
    upload.fields([{ name: "attachments" }, { name: "images" }]),
    sendEmail
);
emailrouter.get("/receive", verifyToken, receiveEmail);
emailrouter.get("/getsentemail", verifyToken, getSentEmails);
// Get inbox count for the logged-in user
emailrouter.get("/inbox-count", verifyToken, getInboxCount);
// Mark an email as read
emailrouter.put("/read/:id", verifyToken, readInboxEmails);
emailrouter.get("/starred", verifyToken, getStarredEmails);
emailrouter.put("/star/:id", verifyToken, starredEmail);
emailrouter.post("/delete", verifyToken, deleteEmail);
// get soft deleted mail
emailrouter.get("/deleted", verifyToken, getDeletedEmails);
//delete permanently
emailrouter.post("/permanent-delete", verifyToken, permanentDeleteEmails);

module.exports = emailrouter;
