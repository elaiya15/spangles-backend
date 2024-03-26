const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// Define Mongoose schema for ApplicationList
const SelectedCandidateSchema = new Schema({
  Name: { type: String, trim: true },
  EmployeeCode: {type:String,  trim:true},
  Designation: { type: String, trim: true },
  Experience: { type: String, trim: true },
  Skills: { type: String, trim: true },
  Resume: { type: String, trim: true },
  Description: { type: String, trim: true },
  status: {
    type: String,
    enum: ['Approve', 'Approved'],
    default: 'Approve',
  },
});

  const SelectedCandidate = mongoose.model('SelectedCandidate',SelectedCandidateSchema );

module.exports = SelectedCandidate;