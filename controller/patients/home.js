const pagelimit = require("../../utils/pagelimit.js");
const trycatchAsync = require("../../middleware/TryCatchasync");
const Patient = require("../../models/patientModel.js");

exports.Home = trycatchAsync(async (req, res) => {
  const messages = req.flash("info");
  const locals = {
    title: "Patient Management",
    discription: "Patient Management",
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
    messages,
  });
});

exports.add = trycatchAsync(async (req, res) => {
  const locals = {
    title: "Patient Management",
    discription: " ADD New Patients",
  };
  res.render("Patients/add", { locals });
});
