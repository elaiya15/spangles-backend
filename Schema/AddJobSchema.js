 


 const mongoose = require("mongoose");
 const Schema = mongoose.Schema;

  const AddJobSchema = new Schema({
    Designation: { type: String, trim: true }, 
    WorkExperience: { type:String , trim: true }, 
    ClosingDate: { type: String, trim: true }, 
    RecruiterMail : { type: String, trim: true }, 
    SalaryRangeFrom : { type: String, trim: true }, 
    SalaryRangeTo : { type: String, trim: true }, 
    PreferredSkills : [{ type: String}], 
    JobDescription : { type: String, trim: true }, 
  });
   
  const AddJob = mongoose.model('AddJobs',AddJobSchema );
  
  module.exports = AddJob;