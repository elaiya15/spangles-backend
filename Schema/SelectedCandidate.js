const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// Define Mongoose schema for ApplicationList
const SelectedCandidateSchema = new Schema({
  Applicant_id:mongoose.SchemaTypes.ObjectId,
  Name: { type: String, required: true, trim: true },
  EmployeeCode: { type: String, trim: true },
  ProfileImage: { type: String, trim: true },
  Designation: { type: String, required: true, trim: true },
  JoiningDate: { type: Date, trim: true },
  Gender: { type: String, enum: ['Male', 'Female', 'Other'], trim: true },
  MaritalStatus: { type: String, enum: ['Single', 'Married', 'Divorced', 'Widowed'], trim: true },
  DateofBirth: { type: String, trim: true },
  EducationQualification: [{
    Qualification: { type: String, trim: true },
    pdf: { type: String }
  }],
  PhoneNumber: { type: Number, trim: true },
  AlternativePhoneNumber: { type: Number, trim: true },
  EmailOffice: { type: String, unique: true, trim: true },
  EmailPersonal: { type: String, unique: true, trim: true },
  BloodGroup: { type: String, trim: true },
  AadhaarNumber: { type: Number },
  AddressPresent: {
    AddressLine1: { type: String, minlength: 0, maxlength: 500 },
    AddressLine2: { type: String, minlength: 0, maxlength: 500 },
    City: { type: String, trim: true },
    District: { type: String, trim: true },
    State: { type: String, trim: true },
    ZipCode: { type: Number }
  },
  AddressPermanent: {
    AddressLine1: { type: String, minlength: 0, maxlength: 500 },
    AddressLine2: { type: String, minlength: 0, maxlength: 500 },
    City: { type: String, trim: true },
    District: { type: String, trim: true },
    State: { type: String, trim: true },
    ZipCode: { type: Number }
  },
  AccountNumber: { type: Number },
  IFSCCode: { type: String, trim: true },
  BankName: { type: String, trim: true },
  PANNumber: { type: String, trim: true },
  Status: {
    type: String,
    enum: ['Approve', 'Approved', 'SendMail', 'Waiting for Respond'],
    default: 'SendMail'
  }
});

  const SelectedCandidate = mongoose.model('SelectedCandidate',SelectedCandidateSchema );

module.exports = SelectedCandidate;