const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortlistedApplicantSchema = new Schema({
  Name: { type: String, trim: true },
  Designation: { type: String, trim: true },
  Experience: { type: String, trim: true },
  Skills: { type: String, trim: true },
  Resume: { type: String, trim: true },
  SalaryExpectation: { type: String, trim: true },
  AppliedOn: { type: String, trim: true },
  Description: { type: String, trim: true },
  InterviewStatus: {
    type: String,
    enum: ["To be Scheduled", "Selected to next round", "Completed", "Waiting","In-Progress"],
    default: "To be Scheduled",
  },
  InterviewMode: {
    type: String,
    enum: ["Have to set", "Online", "Offline"],
    default: "Have to set",
  },
 
  status: {
    type: String,
    enum: ["Start", "In-Progress", "Selected", "Reject", "Hold"],
    default: "Start",
  },
  FirstInterviewe:{
            

  },
  SecondInterviewe:{
    

  },
  

  
});

const ShortlistedApplicant = mongoose.model(
  "Shortlisted",
  shortlistedApplicantSchema
);
module.exports = ShortlistedApplicant;
