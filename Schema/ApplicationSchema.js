const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// Define Mongoose schema for ApplicationList
const applicationListSchema = new Schema({
  Job_id: mongoose.SchemaTypes.ObjectId,
  Name: { type: String, trim: true },
  Skills: { type: String, trim: true },
  Resume: { type: String, trim: true },
  SalaryExpectation: { type: String, trim: true },
  AppliedOn: { type:Date, trim: true },
  Description: { type: String, trim: true },
  Experience:{ type: String, trim: true },
  Email: { type: String, trim: true },
  Status: {
    type: String,
    enum: ['New', 'Shortlist', 'Reject', 'On Hold'],
    default: 'New',
  },
});

  const ApplicationList = mongoose.model('ApplicationList', applicationListSchema);

module.exports = ApplicationList;