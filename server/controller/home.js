const pagelimit = require("../utils/pagelimit.js");
const trycatchAsync = require("../middleware/TryCatchasync.js");
const Patient = require("../models/patientModel.js");





exports.view = trycatchAsync(async (req, res) => {
  const info = req.flash("info");
  const error = req.flash("error");
  const locals = {
    title: "Patient Management",
    discription: "Patient Management",
    messages: { info, error },
  };

  const { page, limit, skip } = pagelimit(req);

  const patient = await Patient.aggregate([
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit },
  ]);

  const totalPatients = await Patient.countDocuments();
  const totalPages = Math.ceil(totalPatients / limit);

  res.render("Patients/view", {
    locals,
    patient,
    totalPages,
    currentPage: page,
  });
});

exports.add = trycatchAsync(async (req, res) => {
  const info = req.flash("info");
  const error = req.flash("error");
  const locals = {
    title: "Patient Management",
    discription: " ADD New Patients",
    messages: { info, error },
  };
  res.render("Patients/add", { locals });
});

exports.patientview = trycatchAsync(async (req, res) => {
  const info = req.flash("info");
  const error = req.flash("error");
  const patient = await Patient.findOne({ _id: req.params.id });
  const locals = {
    title: "Patient Management",
    discription: "Patient Details",
    patient: patient,
    messages: { info, error },
  };
  res.render("Patients/patientview", { locals });
});

exports.search = trycatchAsync(async (req, res) => {
  const search = req.query.cnic;
  const patient = await Patient.find({ nic: search });
  console.log(patient);
  const info = req.flash("info");
  const error = req.flash("error");
  const locals = {
    title: "Patient Management",
    discription: "Search Patients",
    err: "Patient Not Found",
    patient: patient,
    messages: { info, error },
  };
  if (patient.length == 0) {
    await req.flash("info", "No Patient Found");
    return res.redirect("/");
  }
  res.render("search", { locals });
});

exports.edit = trycatchAsync(async (req, res) => {

  const info = req.flash("info");
  const error = req.flash("error");
  const patient = await Patient.findOne({ _id: req.params.id });
  const locals = {
    title: "Patient Management",
    discription: "Edit Patients",
    patient: patient,
    messages: { info, error },
  };
  res.render("Patients/edit", { locals });
});

exports.del = trycatchAsync(async (req, res) => {
  const patient = await Patient.findOne({
    _id: req.params.id,
  });

  const info = req.flash("info");
  const error = req.flash("error");
  const locals = {
    title: "Patient Management",
    discription: "Delete Patients",
    patient: patient,
    messages: { info, error },
  };
  res.render("Patients/delete", { locals });
});


exports.dashboard = trycatchAsync(async (req, res) => {
  const info = req.flash("info");
  const error = req.flash("error");
  const locals = {
    title: "Patient Management",
    discription: "Dashboard",
    messages: { info, error },
  };
  res.render("Patients/dashboard", { locals });
})


