const express = require("express");
const router = express.Router();

const home = require("../controller/patients/home");

const Patient = require("../controller/patients/Patients");

const upload = require("../utils/File");

router.get("/", home.Home);

router.get("/add", home.add);

router.post("/create", upload.single("file"), Patient.create);

module.exports = router;
