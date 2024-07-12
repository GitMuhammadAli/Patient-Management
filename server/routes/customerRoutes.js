const express = require("express");
const router = express.Router();

const home = require("../controller/home");

const Patient = require("../controller/Patients");

const upload = require("../utils/File");

router.get("/view", home.view);

router.get("/", home.dashboard);

router.get("/add", home.add);

router.get("/view/:id", home.patientview);

router.get("/edit/:id", home.edit);

router.post(
  "/create",
  upload.fields([{ name: "files", maxCount: 10 }]),
  Patient.create
);
router.post(
  "/update/:id",
  upload.fields([{ name: "files", maxCount: 10 }]),
  Patient.update
);

router.get("/delete/:id", home.del);

router.get("/download/:filename", Patient.download);

router.post("/delete/:id", Patient.delete);

router.get("/search", home.search);

module.exports = router;
