const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/user/info/:per/:page", require("./handlers/user").getUsers);
router.get("/user/details", require("./handlers/user").getUsers);
module.exports = router;
