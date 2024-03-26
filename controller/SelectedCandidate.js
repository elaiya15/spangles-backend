const express = require("express");
const ShortlistedApplicant = require("../Schema/ShortListed");
const SelectedCandidateModel = require("../Schema/SelectedCandidate.js"); // Import the SelectedCandidate model
const { User, Profiles } = require('../Schema/RegesterSchema');
const generateEmployeeCode = require('../controller/EmployeeCodeGenerater.js');

// Get All Shortlisted ApplicationList
exports.GetApplicationList = async (req, res, next) => {
  try {
    const Applicant = await ShortlistedApplicant.find();
    return res.status(201).json(Applicant);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

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
