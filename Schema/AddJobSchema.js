 


 const mongoose = require("mongoose");
 const Schema = mongoose.Schema;

 const CategorySchema = new Schema({
  CategoryName: { type: String, trim: true }, 
});


  const AddJobSchema = new Schema({
    Category:mongoose.SchemaTypes.ObjectId,
    Designation: { type: String, trim: true }, 
    WorkExperience: { type:String , trim: true }, 
    RecruiterMail : { type: String, trim: true }, 
    PreferredSkills : [{ type: String}], 
    JobSummary: { type: String, trim: true }, 
    ResponsibilitiesAndDuties: { type: String, trim: true }, 
    RequiredExperienceAndQualifications: { type: String, trim: true }, 
    CreatedOn:{ type: String, trim: true }, 
    Status: {
      type: String,
      enum: ['Active', 'In-Active'],
      default: 'Active',
    },
  });
   
  
const Category = mongoose.model('Category',CategorySchema );

  const AddJob = mongoose.model('AddJobs',AddJobSchema );
  
  module.exports = {AddJob,Category};