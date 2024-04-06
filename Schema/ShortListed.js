const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortlistedApplicantSchema = new Schema({
  Applicant_id: mongoose.SchemaTypes.ObjectId,
  Result: { type: String, trim: true, default: "Start" },
  InterviewStatus: { type: String, trim: true, default: "To be Schedule" },
  // || Selected to Round {2} || Completed ",
  InterviewRounds: [
    // {
    //   "Round": 1,
    //   "SetDate": "10-12-2024",
    //   "time": "02.00PM",
    //   "InterviewMode": "Have to set || Online ",
    //   "Medium": "Google Meet",
    //   "InterviewLink": "https//:google-meet.com",
    //   "Interviewers": ["ObjectId(2165156)", "ObjectId(16545923)"],
    //   "InstructionToInterviewer": " interview schedule to you ",
    //   "FeedbackByInterviewer": " candidate move tow next round"
    // },
    // {
    //   "Round": 2,
    //   "SetDate": "10-12-2024",
    //   "time": "02.00PM",
    //   "InterviewMode": "Have to set || Offline ",
    //   "Interviewers": ["ObjectId(2165156)", "ObjectId(16545923)"],
    //   "InstructionToInterviewer": " interview schedule to you ",
    //   "FeedbackByInterviewer": " candidate move tow next round"
    // }
  ],
});

const ShortlistedApplicant = mongoose.model(
  "Shortlisted",
  shortlistedApplicantSchema
);
module.exports = ShortlistedApplicant;
