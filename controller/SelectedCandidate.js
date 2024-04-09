const express = require("express");
const { AddJob, Category } = require("../Schema/AddJobSchema");
const ApplicationList = require("../Schema/ApplicationSchema");
const Templates = require("../Schema/TemplateSchema");
const ShortlistedApplicant = require("../Schema/ShortListed");
const SelectedCandidateModel = require("../Schema/SelectedCandidate.js");
const { User, Profiles } = require('../Schema/RegesterSchema');
const generateEmployeeCode = require('../controller/EmployeeCodeGenerater.js');

// Get All Shortlisted ApplicationList
exports.GetApplicationList = async (req, res, next) => {
  try {
    const shortlistedApplicants = await ShortlistedApplicant.find();
    const allGetTemplates = await Templates.find();
    const addJobs = await AddJob.find();
    const applicationLists = await ApplicationList.find();

    return res.status(200).json({ JobData: addJobs, ApplicantsList: applicationLists, Templates: allGetTemplates, ShortlistedList: shortlistedApplicants });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// createInterviewRound
exports.createInterviewRound = async (req, res) => {
  try {
    const { Id } = req.params;
    const {roundData } = req.body;

    // Find the shortlisted applicant by shortlistedId
    const shortlistedApplicant = await ShortlistedApplicant.findById(Id);
    if (!shortlistedApplicant) {
      return res.status(404).json({ message: 'Shortlisted applicant not found' });
    }

    // Push the new interview round data to the InterviewRounds array
    shortlistedApplicant.InterviewRounds.push(roundData);
    await shortlistedApplicant.save();

    return res.status(201).json({ message: 'Interview round added successfully' });
  } catch (error) {
    return res.status(400).json({ message : "Bad Request or missing required parameters"});
  }
};

// //  updateInterviewRound
// exports.updateInterviewRound = async (req, res) => {
//   try {
//     const { Id } = req.params;
//     const { roundId, updatedRoundData } = req.body;

//     // Find the shortlisted applicant by shortlistedId
//     const shortlistedApplicant = await ShortlistedApplicant.findById(Id);
//     if (!shortlistedApplicant) {
//       return res.status(404).json({ message: 'Shortlisted applicant not found' });
//     }

//     // Find the interview round by roundId in the InterviewRounds array
//     const interviewRound = shortlistedApplicant.InterviewRounds.id(roundId);
//     if (!interviewRound) {
//       return res.status(404).json({ message: 'Interview round not found' });
//     }

//     // Update the interview round data
//     interviewRound.set(updatedRoundData);
//     await shortlistedApplicant.save();

//     return res.status(200).json({ message: 'Interview round updated successfully' });
//   } catch (error) {
//     return res.status(400).json({ message: "Interview round update Failed " });
//   }
// };








// Update an applicant by ID
exports.UpdateShortList = async (req, res, next) => {
  const data = req.body;
  try {
    const { id } = req.params;
    const CheckStatus = await ShortlistedApplicant.findById(id);

    if (CheckStatus.status === req.body.status) {
      return res.status(404).json({ msg: `Status ${req.body.status} Already Updated` });
    }

    const updatedApplicant = await ShortlistedApplicant.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    // Check if the status is being updated to "Selected"
    if (data.status === "Selected") {
      // Generate EmployeeCode
      const EmployeeCode = await generateEmployeeCode();
      // Create a new SelectedCandidate applicant based on the updated data
      const Selected = { ...updatedApplicant.toObject() };
      delete Selected._id; // Remove the _id field
      delete Selected.status; // Remove the status field
      delete Selected.InterviewStatus; // Remove the InterviewStatus field
      delete Selected.InterviewMode; // Remove the InterviewMode field
      Selected.EmployeeCode = EmployeeCode;

      // Create a new instance of SelectedCandidate and save it
      const newSelectedCandidate = new SelectedCandidateModel(Selected);
      await newSelectedCandidate.save();
      return res.status(201).json({ SelectedCandidate: newSelectedCandidate });
    }
    
    // If status is not "Selected", return the updated applicant
    return res.status(200).json({ update: updatedApplicant });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
