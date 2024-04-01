 


 const mongoose = require("mongoose");
 const Schema = mongoose.Schema;

  const AddJobSchema = new Schema({
    Designation: { type: String, trim: true }, 
    WorkExperience: { type:String , trim: true }, 
    PostedDate: { type: String, trim: true }, 
    ClosingDate: { type: String, trim: true }, 
    RecruiterMail : { type: String, trim: true }, 
    SalaryRangeFrom : { type: String, trim: true }, 
    SalaryRangeTo : { type: String, trim: true }, 
    PreferredSkills : [{ type: String}], 
    JobDescription : { type: String, trim: true }, 
    Status: {
      type: String,
      enum: ['Active', 'In-Active'],
      default: 'Active',
    },
  });
   
  const AddJob = mongoose.model('AddJobs',AddJobSchema );
  
  module.exports = AddJob;