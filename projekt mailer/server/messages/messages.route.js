const express = require("express");
const router = express.Router();
const messageService = require("./service/messages");

router.post("/api/messages", messageService.getMessages);

module.exports = router;
