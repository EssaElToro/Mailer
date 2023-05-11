const express = require("express");
const router = express.Router();
const userService = require("./service/users");

router.get("/api/users", userService.GetUsers);
router.post("/api/delete-user", userService.deleteUser);
router.post("/api/users", userService.addUser);

module.exports = router;
