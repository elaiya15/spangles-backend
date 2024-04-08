const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortlistedApplicantSchema = new Schema({
  Applicant_id: mongoose.SchemaTypes.ObjectId,
  Result: { type: String, trim: true, default: null },
  InterviewStatus: { type: String, trim: true, default: null },
  InterviewRounds: [],
});

const ShortlistedApplicant = mongoose.model(
  "Shortlisted",
  shortlistedApplicantSchema
);
module.exports = ShortlistedApplicant;
