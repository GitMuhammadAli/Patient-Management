const Patient = require("../models/patientModel.js");
const trycatchAsync = require("../middleware/TryCatchasync.js");
const sendMail = require("../utils/SendMail.js");

exports.create = trycatchAsync(async (req, res, next) => {
  const { name, email, age, gender, phoneNo, nic, address } = req.body;
  console.log(req.file);
  const image = req.file;

  const newPatient = new Patient({
    name,
    email,
    age,
    gender,
    phoneNo,
    nic,
    address,
    file: image || null,
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

exports.update = trycatchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, email, age, gender, phoneNo, nic } = req.body;
  const image = req.file;

  const updatedPatient = {
    name,
    email,
    age,
    gender,
    phoneNo,
    nic,
    file: image || null,
    createdAt: Date.now(),
  };
  try {
    const patient = await Patient.findByIdAndUpdate(id, updatedPatient, {
      new: true,
    });
    console.log(patient);
    if (patient) {
      await req.flash("info", "Patient has been updated.");
      res.redirect(`/view/${id}`);
    }
  } catch (error) {
    await req.flash("error", "Error updating patient.");
    res.redirect(`/view/${id}`);
  }
});

exports.delete = trycatchAsync(async (req, res) => {
  const id = req.params.id;
  const password = "12345678";
  const confirmpassword = req.body.confirm;
  const dbdelete = req.body.hardDelete;

  console.log(dbdelete);
  if (password !== confirmpassword) {
    await req.flash("error", "Confirmation Passwords do not match.");
    res.redirect(`/view/${id}`);
  } else if (password == confirmpassword) {
    const patient = await Patient.findByIdAndUpdate(
      id,
      {
        delete: true,
      },
      {
        new: true,
      }
    );
    if (patient) {
      await req.flash("info", "Patient has been deleted.");
      res.redirect("/");
    }
  } else if (dbdelete == "on" && password == confirmpassword) {
    const patient = await Patient.findByIdAndDelete(id);
    if (patient) {
      await req.flash("info", "Patient has been deleted.");
      res.redirect("/");
    }
  }
});
