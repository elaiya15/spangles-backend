const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// Define Mongoose schema for ApplicationList
const applicationListSchema = new Schema({
  Name: { type: String, trim: true },
  Designation: { type: String, trim: true },
  Experience: { type: String, trim: true },
  Skills: { type: String, trim: true },
  Resume: { type: String, trim: true },
  SalaryExpectation: { type: String, trim: true },
  AppliedOn: { type:Date, trim: true },
  Description: { type: String, trim: true },
  Email: { type: String, trim: true },
  status: {
    type: String,
    enum: ['View', 'Shortlist', 'Reject', 'on hold'],
    default: 'View',
  },
});

  const ApplicationList = mongoose.model('ApplicationList', applicationListSchema);

module.exports = ApplicationList;