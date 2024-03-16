const express = require("express");
const router = express.Router();

const home = require("../controller/home");

const Patient = require("../controller/Patients");

const upload = require("../utils/File");

router.get("/", home.Home);

router.get("/add", home.add);

router.get("/view/:id", home.view);

router.post("/create", upload.single("file"), Patient.create);

module.exports = router;
