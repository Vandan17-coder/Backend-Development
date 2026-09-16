const express = require("express");
const {register} = require("../controllers/user.controller");
const router = express.Router();

router.post("/", register);

module.exports = router;