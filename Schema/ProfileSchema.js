
const mongoose = require('mongoose');

const Schema = mongoose.Schema;






//Define ProfileSchema
const profileSchema = new Schema({ 
 Name: { type: String,trim: true },
  EmployeeCode: {type:String,  trim:true},
  Designation: {type:String, trim:true},
  JoiningDate: {type:Date, trim:true},
LastWorkingDate: {type:Date, trim:true},
ReportingManager: {type:String, trim:true},
Salary:{type:Number, trim:true},
WorkTime:{StartTime: {type:String, trim:true},
EndTime: {type:String, trim:true}},
WeekOff:{type:String, trim:true},
  MaritalStatus:{type:String, trim:true},
  EducationQualification:[{
    Qualification:{ type:String, trim:true },
     pdf:{type:String} 
  }],
  PhoneNumber:{type:Number, trim:true},
  AlternativePhoneNumber:{type:Number, trim:true},
  EmailOffice:{type:String, unique: true,trim:true},
  EmailPersonal:{type:String, unique: true,trim:true},
  BloodGroup:{type:String},
  AadhaarNumber:{type:Number,},
  AddressPresent:{
    AddressLine1:{type:String, min: 0, 
    max: 500,},
    AddressLine2:{type:String, min: 0, 
      max: 500, },
      City:{type:String,},
      District:{type:String,},
      State:{type:String,},
      ZipCode:{type:Number,}
  },
  AddressPermanent:{
    AddressLine1:{type:String, min: 0, 
    max: 500},
    AddressLine2:{type:String, min: 0, 
      max: 500 },
      City:{type:String},
      District:{type:String},
      State:{type:String},
      ZipCode:{type:Number}
  },
  AccountNumber:{type:Number},
  IFSCCode :{type:String},
  BankName :{type:String},
  PANNumber:{type:String},
  

});

const Profiles= mongoose.model('Profile', profileSchema);
module.exports = Profiles;
