const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// Define Mongoose schema for ApplicationList
const SelectedCandidateSchema = new Schema({
  Applicant_id:mongoose.SchemaTypes.ObjectId,
  Name: { type: String, trim: true },
  EmployeeCode: {type:String,  trim:true},
  Designation: { type: String, trim: true },
  Experience: { type: String, trim: true },
  Skills: { type: String, trim: true },
  Resume: { type: String, trim: true },
  Description: { type: String, trim: true },
  Status: {
    type: String,
    enum: ['Approve', 'Approved',"SendMail"],
    default: 'SendMail',
  },
});

  const SelectedCandidate = mongoose.model('SelectedCandidate',SelectedCandidateSchema );

module.exports = SelectedCandidate;