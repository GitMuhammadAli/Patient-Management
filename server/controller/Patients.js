const Patient = require("../models/patientModel.js");
const trycatchAsync = require("../middleware/TryCatchasync.js");
const sendMail = require("../utils/SendMail.js");
const path = require('path');
const fs = require('fs');

exports.create = trycatchAsync(async (req, res, next) => {
  const { name, email, age, gender, phoneNo, nic, address } = req.body;
  const files = req.files["files"] || [];

  const newPatient = new Patient({
    name,
    email,
    age,
    gender,
    phoneNo,
    nic,
    address,
    files: files.map((file) => ({
      filename: file.filename,
      path: file.path,
      contentType: file.mimetype,
    })),
  });

  const to = req.body.email;
  const subject = `Thank you for visiting our hospital`;
  const text = `Hello, thank you ${req.body.name} for visiting! Your NIC Number Is ${req.body.nic}`;
  const html = "<b>Hello, welcome to our hospital!</b>";

  try {
    const savedPatient = await Patient.create(newPatient);
    const emailResult = await sendMail(to, subject, text, html);

    if (savedPatient && emailResult.success) {
      await req.flash("info", "New patient has been added and email has been sent.");
      res.redirect("/view");
    } else if (savedPatient && !emailResult.success) {
      await req.flash("error", "New patient added but failed to send email.");
      res.redirect("/");
    } else {
      await req.flash("error", "Error creating patient. Please try again.");
      res.redirect("/");
    }
  } catch (error) {
    await req.flash(
      "error",
      `Error creating patient. Fill the form again and correctly. ${error}`
    );
    res.redirect("/add");
  }
});
exports.update = trycatchAsync(async (req, res, next) => {
  const user = req.params.id;
  const { name, email, age, gender, phoneNo, address, keepOldFiles } = req.body;
  let files = req.files["files"] || [];

  if (!Array.isArray(files)) {
    files = [files];
  }

  const fileArray = files.map((file) => ({
    filename: file.filename,
    path: file.path,
    contentType: file.mimetype,
  }));

  try {
    const patient = await Patient.findById(user);

    let updatedFiles = fileArray;
    if (keepOldFiles) {
      updatedFiles = [...patient.files, ...fileArray];
    }

    const updatedPatient = {
      name,
      email,
      age,
      gender,
      phoneNo,
      address,
      files: updatedFiles,
    };

    const updatedPatientData = await Patient.findByIdAndUpdate(
      user,
      updatedPatient,
      { new: true }
    );

    if (updatedPatientData) {
      await req.flash("info", "Patient has been updated.");
      res.redirect(`/view/${user}`);
    }
  } catch (error) {
    console.log(error);
    await req.flash("error", "Error updating patient.");
    res.redirect(`/view/${user}`);
  }
});


exports.delete = trycatchAsync(async (req, res) => {
  console.log("inside delete");
  console.log(req.body);

  const id = req.params.id;
  const password = "12345678";
  const confirmpassword = req.body.confirm;
  const dbdelete = req.body.hardDelete === 'on'; 

  console.log(id);
  console.log(dbdelete);

  if (password !== confirmpassword) {
    await req.flash("error", "Confirmation Passwords do not match.");
    return res.redirect(`/view/${id}`);
  }

  try {
    if (!dbdelete) {
     let patient = await Patient.findByIdAndUpdate(
        id,
        { delete: true }, 
        { new: true } 
      );
    } else {
      patient = await Patient.findByIdAndDelete(id);
    }

    if (patient) {
      await req.flash("info", "Patient has been deleted.");
      return res.redirect("/");
    } else {
      await req.flash("error", "Patient not found.");
      return res.redirect("/");
    }
  } catch (err) {
    console.error("Error deleting patient:", err);
    await req.flash("error", "Failed to delete patient.");
    return res.redirect(`/view/${id}`);
  }
});


exports.download = trycatchAsync(async (req, res) => {
  const filename = req.params.filename;

  const baseUploadsDir = path.join(__dirname, '..', '..', 'uploads');

  if (!fs.existsSync(baseUploadsDir)) {
    console.error(`Uploads directory does not exist: ${baseUploadsDir}`);
    return res.status(500).send("Uploads directory does not exist.");
  }

  const findFile = (dir, filename) => {
    const subdirs = fs.readdirSync(dir);
    for (let subdir of subdirs) {
      const currentPath = path.join(dir, subdir);
      if (fs.statSync(currentPath).isDirectory()) {
        const filePath = path.join(currentPath, filename);
        if (fs.existsSync(filePath)) {
          return filePath;
        }
      }
    }
    return null;
  };

  const filePath = findFile(baseUploadsDir, filename);

  if (!filePath) {
    console.log(`File not found: ${filename}`);
    return res.status(404).send("File not found.");
  }

  console.log(`Attempting to download file: ${filePath}`);
  
  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
  res.setHeader('Content-Type', 'application/octet-stream');
  
  const readStream = fs.createReadStream(filePath);
  
  readStream.on('error', (err) => {
    console.error(`Error reading file: ${err}`);
    res.status(500).send("Error reading file.");
  });

  readStream.pipe(res).on('finish', () => {
    console.log('Download Completed');
  });
});


