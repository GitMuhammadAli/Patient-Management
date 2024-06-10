const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  phoneNo: {
    type: String,
    required: false,
  },
  nic: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  address: {
    type: String,
  },
  files: [
    {
      filename: String,
      path: String,
      contentType: String,
    },
  ],
  delete: { type: Boolean, default: false },
});

const Patient = mongoose.model("Patient", PatientSchema);
module.exports = Patient;
