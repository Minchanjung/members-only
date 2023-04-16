const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

router.post("/create-message", messageController.create_message_post)

module.exports = router;