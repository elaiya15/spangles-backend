
// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;


// //Define ProfileSchema
//  const profileSchema = new Schema({ 
  
//     Name: { type: String, trim: true },
//     ProfileImage: { type: String, trim: true },
//     EmployeeCode: { type: String, trim: true },
//     Designation: { type: String, trim: true },
//     JoiningDate: { type: Date, trim: true },
//     Gender: { type: String, enum: ['Male', 'Female', 'Other'], trim: true },
//     MaritalStatus: { type: String, enum: ['Single', 'Married', 'Divorced', 'Widowed'], trim: true },
//     DateofBirth: { type: String, trim: true },
//     LastWorkingDate: { type: Date, trim: true },
//     ReportingManager: { type: String, trim: true },
//     Salary: { type: String, trim: true },
//     WorkTime: {
//       StartTime: { type: String, trim: true },
//       EndTime: { type: String, trim: true }
//     },
//     WeekOff: { type: String, trim: true },
//     EducationQualification: [{
//       Qualification: { type: String, trim: true },
//       pdf: { type: String }
//     }],
//     PhoneNumber: { type: String, trim: true },
//     AlternativePhoneNumber: { type: String, trim: true },
//     EmailOffice: { type: String, unique: true, trim: true },
//     EmailPersonal: { type: String, unique: true, trim: true },
//     BloodGroup: { type: String, trim: true },
//     AadhaarNumber: { type: String },
//     AddressPresent: {
//       AddressLine1: { type: String, minlength: 0, maxlength: 500 },
//       AddressLine2: { type: String, minlength: 0, maxlength: 500 },
//       City: { type: String, trim: true },
//       District: { type: String, trim: true },
//       State: { type: String, trim: true },
//     Country:{type: String, trim: true },
//       ZipCode: { type: String }
//     },
//     AddressPermanent: {
//       AddressLine1: { type: String, minlength: 0, maxlength: 500 },
//       AddressLine2: { type: String, minlength: 0, maxlength: 500 },
//       City: { type: String, trim: true },
//       District: { type: String, trim: true },
//       State: { type: String, trim: true },
//      Country:{type: String, trim: true },
//       ZipCode: { type: String }
//     },
//     AccountNumber: { type: String },
//     IFSCCode: { type: String, trim: true },
//     BankName: { type: String, trim: true },
//     PANNumber: { type: String, trim: true }
// });

// const Profiles= mongoose.model('Profile', profileSchema);
// module.exports = Profiles;
