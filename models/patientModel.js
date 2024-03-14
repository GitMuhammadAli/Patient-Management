const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CrudPatientSchema = new Schema({
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
    type: Number,
    required: false,
  },
  nic: {
    type: Number,
    required: true,
    unique: true,
  },
  file: {
    filename: String,
    path: String,
    contentType: String,
  },
  delete: { type: Boolean, default: false },
});

// CrudPatientSchema.method.findByNic = async function (nic) {
//   try {
//     const patient = await this.findOne({ nic: nic });
//     return patient;
//   } catch (error) {
//     throw error;
//   }
// };

const Patient = mongoose.model("Patient", CrudPatientSchema);
module.exports = Patient;
