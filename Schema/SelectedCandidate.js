const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// Define Mongoose schema for ApplicationList
const SelectedCandidateSchema = new Schema({
  Applicant_id: mongoose.SchemaTypes.ObjectId,
  EmployeeCode: { type: String, trim: true },
  ProfileImage: { type: String, trim: true },
  JoiningDate: { type: String, trim: true },
  Gender: { type: String, enum: ["Male", "Female", "Other"], trim: true },
  MaritalStatus: {
    type: String,
    enum: [ "Married",'UnMarried', "Divorced", "Widowed"],
    trim: true,
  },
  DateofBirth: { type: String, trim: true },
  EducationQualification:{ type: Array, default: null},
  BloodGroup: { type: String, trim: true },
  EmailAlternative: { type: String, unique: true, trim: true },
  AadhaarNumber: { type: String },
  AddressPresent: {
    AddressLine1: { type: String, minlength: 0, maxlength: 500 },
    AddressLine2: { type: String, minlength: 0, maxlength: 500 },
    City: { type: String, trim: true },
    District: { type: String, trim: true },
    State: { type: String, trim: true },
    Country: { type: String, trim: true },
    ZipCode: { type: String },
  },
  AddressPermanent: {
    AddressLine1: { type: String, minlength: 0, maxlength: 500 },
    AddressLine2: { type: String, minlength: 0, maxlength: 500 },
    City: { type: String, trim: true },
    District: { type: String, trim: true },
    State: { type: String, trim: true },
    Country: { type: String, trim: true },
    ZipCode: { type: String },
  },
  AccountNumber: { type: String },
  IFSCCode: { type: String, trim: true },
  BankName: { type: String, trim: true },
  PANNumber: { type: String, trim: true },
  VerifyToken: {
    type: String,
  },
  Status: {
    type: String,
    enum: ["In Progress", "Approved", "Waiting"],
    default: null,
  },
});

const SelectedCandidate = mongoose.model(
  "SelectedCandidate",
  SelectedCandidateSchema
);

module.exports = SelectedCandidate;
