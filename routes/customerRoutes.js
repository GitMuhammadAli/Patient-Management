const express = require("express");
const router = express.Router();

const home = require("../controller/patients/home");

router.get("/", home.Home);

module.exports = router;
