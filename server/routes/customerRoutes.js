const express = require("express");
const router = express.Router();

const home = require("../controller/home");

const Patient = require("../controller/Patients");

const upload = require("../utils/File");

router.get("/", home.Home);

router.get("/add", home.add);

router.get("/view/:id", home.view);

router.get("/edit/:id", home.edit);

router.post("/create", upload.single("file"), Patient.create);

router.post("/update/:id", upload.single("file"), Patient.update);

router.get("/delete/:id", home.del);

router.post("/delete/:id", Patient.delete);

router.get("/search", home.search);

module.exports = router;
