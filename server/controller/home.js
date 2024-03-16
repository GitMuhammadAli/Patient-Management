const pagelimit = require("../utils/pagelimit.js");
const trycatchAsync = require("../middleware/TryCatchasync.js");
const Patient = require("../models/patientModel.js");

exports.Home = trycatchAsync(async (req, res) => {
  const messages = req.flash("info");
  const locals = {
    title: "Patient Management",
    discription: "Patient Management",
    messages: messages,
  };

  const { page, limit, skip } = pagelimit(req);

  const patient = await Patient.aggregate([
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit },
  ]);

  const totalPatients = await Patient.countDocuments();

  const totalPages = Math.ceil(totalPatients / limit);

  res.render("index", {
    locals,
    patient,
    totalPages,
    currentPage: page,
  });
});

exports.add = trycatchAsync(async (req, res) => {
  const error = req.flash("error");
  const locals = {
    title: "Patient Management",
    discription: " ADD New Patients",
    error: error,
  };
  res.render("Patients/add", { locals });
});

exports.view = trycatchAsync(async (req, res) => {
  const error = req.flash("error");
  const patient = await Patient.findOne({ _id: req.params.id });

  const locals = {
    title: "Patient Management",
    discription: "Patient Details",
    error: error,
    patient: patient,
  };
  res.render("Patients/view", { locals });
});
