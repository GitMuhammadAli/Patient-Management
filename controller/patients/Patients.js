const Patient = require("../models/patientModel.js");
const trycatchAsync = require("../../middleware/TryCatchasync");
const sendMail = require("../utils/SendMail.js");

exports.create = trycatchAsync(async (req, res, next) => {
  const { name, email, age, gender, phoneNo, nic } = req.body;
  console.log(req.file);
  const image = req.file;

  const newPatient = new Patient({
    name,
    email,
    age,
    gender,
    phoneNo,
    nic,
    file: image,
  });
  console.log(newPatient);
  const to = req.body.email;
  const subject = `Thank you for visiting our hospital`;
  const text = `Hello, thank you ${req.body.name} for visiting! Your NIC Number Is ${req.body.nic}`;
  const html = "<b>Hello, welcome to our hospital!</b>";

  try {
    const savedPatient = await Patient.create(newPatient);
    console.log(savedPatient);
    const emailResult = await sendMail(to, subject, text, html);
    if (savedPatient && emailResult.success) {
      await req.flash("info", "New patient has been added.");
      res.redirect("/");
    } else if (!savedPatient && !emailResult.success) {
      await req.flash("error", "Error sending welcome email.");
    } else {
      await req.flash("error", "Error creating patient.");
    }
  } catch (err) {
    await req.flash(
      "error",
      "Error creating patient. Fill the form again and correctly."
    );
    res.redirect("/add");
  }
});

// exports.create = async (req, res) => {
//   return res.write("Hello World");
// };
