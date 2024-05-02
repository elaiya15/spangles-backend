const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// Define ProfileSchema
const profileSchema = new Schema({ 

  Name: { type: String, trim: true },
  ProfileImage: { type: String, trim: true },
  EmployeeCode: { type: String, trim: true },
  Designation: { type: String, trim: true },
  JoiningDate: { type: String, trim: true },
  Gender: { type: String, enum: ['Male', 'Female', 'Other'], trim: true },
  MaritalStatus: {
    type: String,
    enum: ["Married", "Unmarried", "Divorced", "Widowed", "Others"],
    trim: true,
  },
  DateofBirth: { type: String, trim: true },
  LastWorkingDate: { type: String, trim: true },
  ReportingManager: { type: String, trim: true },
  Salary: { type: String, trim: true },
  WorkTime: {
    StartTime: { type: String, trim: true },
    EndTime: { type: String, trim: true }
  },
  WeekOff: { type: String, trim: true },
  EducationQualification: {
    type: [Object]
  },
  MobileNumber: { type: String, trim: true },
  AlternativeMobileNumber: { type: String, trim: true },
  EmailOffice: { type: String, unique: true, trim: true },
  EmailPersonal: { type: String, unique: true, trim: true },
  EmailAlternative:{ type: String, trim: true },

  BloodGroup: {
    type: String,
    enum: [
      "A Positive",
      "A Negative",
      "AB Positive",
      "AB Negative",
      "B Positive",
      "B Negative",
      "O Positive",
      "O Negative",
    ],
  },
  AadhaarNumber: { type: String },
  AddressPresent: {
    AddressLine1: { type: String, minlength: 0, maxlength: 500 },
    AddressLine2: { type: String, minlength: 0, maxlength: 500 },
    City: { type: String, trim: true },
    District: { type: String, trim: true },
    State: { type: String, trim: true },
  Country:{type: String, trim: true },
    ZipCode: { type: String }
  },
  AddressPermanent: {
    AddressLine1: { type: String, minlength: 0, maxlength: 500 },
    AddressLine2: { type: String, minlength: 0, maxlength: 500 },
    City: { type: String, trim: true },
    District: { type: String, trim: true },
    State: { type: String, trim: true },
   Country:{type: String, trim: true },
    ZipCode: { type: String }
  },
  AccountNumber: { type: String },
  IFSCCode: { type: String, trim: true },
  BankName: { type: String, trim: true },
  PANNumber: { type: String, trim: true },
  Status:{type: String, trim: true},
  Reason_for_Inactive:{type: String, trim: true}

});

// Define User Schema
 const userSchema = new Schema({
  UserName: { type: String, required: true, unique: true, trim: true },
     // Make sure to hash passwords for security
    Password: { type: String, required: true, select: false },
    EmployeeType:{type:String},
    Profile: mongoose.SchemaTypes.ObjectId
});



const User = mongoose.model('user', userSchema);

const Profiles= mongoose.model('Profile', profileSchema);

module.exports = {User,Profiles};


