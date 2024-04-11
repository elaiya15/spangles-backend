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
  MobileNumber:{
    type: String,
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
  },
  AlternateMobileNumber:{
    type: String,
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
  },
  Status: {
    type: String,
    enum: ['New', 'Shortlist', 'Reject', 'On Hold'],
    default: 'New',
  },
});

  const ApplicationList = mongoose.model('ApplicationList', applicationListSchema);

module.exports = ApplicationList;