const express = require("express");
const { AddJob, Category } = require("../Schema/AddJobSchema");
const ApplicationList = require("../Schema/ApplicationSchema");
const Templates = require("../Schema/TemplateSchema");
const ShortlistedApplicant = require("../Schema/ShortListed");
const SelectedCandidateModel = require("../Schema/SelectedCandidate.js");
const { User, Profiles } = require("../Schema/RegesterSchema");
const generateEmployeeCode = require("../controller/EmployeeCodeGenerater.js");

// Get All Shortlisted ApplicationList
exports.GetApplicationList = async (req, res, next) => {
  try {
    const shortlistedApplicants = await ShortlistedApplicant.find();
    const allGetTemplates = await Templates.find();
    const addJobs = await AddJob.find();
    const applicationLists = await ApplicationList.find();
    const Employees = await Profiles.find();

    return res.status(200).json({
      JobData: addJobs,
      ApplicantsList: applicationLists,
      Templates: allGetTemplates,
      ShortlistedList: shortlistedApplicants,
      Employees: Employees,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// createInterviewRound
exports.createInterviewRound = async (req, res) => {
  try {
    const { id } = req.params;
    const { InterviewData } = req.body;
    // Find the shortlisted applicant by shortlistedId
    const shortlistedApplicant = await ShortlistedApplicant.findById(id);
    if (!shortlistedApplicant) {
      return res
        .status(404)
        .json({ message: "Shortlisted applicant not found" });
    }
    shortlistedApplicant.Result = "In Progress";
    shortlistedApplicant.InterviewStatus =
      "Scheduled to Round " + (shortlistedApplicant.InterviewRounds.length + 1);

    // Push the new interview round data to the InterviewRounds array
    shortlistedApplicant.InterviewRounds.push(InterviewData);
    await shortlistedApplicant.save();

    return res
      .status(201)
      .json({ message: "Interview round added successfully" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Bad Request or missing required parameters" });
  }
};


exports.reInterviewRound = async (req, res) => {
  try {

    const { id } = req.params;

    const { InterviewData } = req.body;
// console.log(InterviewData);
    // Find the shortlisted applicant by shortlistedId
    const shortlistedApplicant = await ShortlistedApplicant.findById(id);
    if (!shortlistedApplicant) {
      return res.status(404).json({ message: 'Shortlisted applicant not found' });
    }

    // Find the interview round with Round in the InterviewRounds array
    const roundIndex = shortlistedApplicant.InterviewRounds.findIndex(round => round.Round === InterviewData.Round);
    // console.log(roundIndex);
    if (roundIndex === -1) {
      return res.status(404).json({ message: 'Interview  Round: not found' });
    }
    
    // shortlistedApplicant.Result = "In Progress";
    // shortlistedApplicant.InterviewStatus =
    //   "Scheduled to Round " + (shortlistedApplicant.InterviewRounds.length);

    // Update the interview round data
    shortlistedApplicant.InterviewRounds[roundIndex] = InterviewData;

    await shortlistedApplicant.save();

    return res.status(200).json({ message: 'Interview Re-Schedule Successfully' });
  } catch (error) {
    return res.status(400).json({ message: "Interview round update failed" });
  }
};





// Update an applicant by ID And it`s add to JoiningList 
exports.UpdateShortList = async (req, res, next) => {
  const data = req.body;
  try {
    const { id } = req.params;
    const CheckStatus = await ShortlistedApplicant.findById(id);

    if (CheckStatus.Result === req.body.Result) {
      return res
        .status(404)
        .json({ msg: `Status ${req.body.Result} Already Updated` });
    }

    const updatedApplicant = await ShortlistedApplicant.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    // Check if the status is being updated to "Selected"
    if (data.Result === "Selected") {
      // Generate EmployeeCode
      const EmployeeCode = await generateEmployeeCode();
      // Create a new SelectedCandidate applicant based on the updated data
      const Selected = { ...updatedApplicant.toObject() };
      delete Selected._id; // Remove the _id field
      delete Selected.Result; // Remove the status field
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
    return res.status(400).json({ message: err.message });
  }
};




//             <<<<<<<<<<<<<<<<<<<<<< JoiningList >>>>>>>>>>>>>>>>>>>>>>>>>>>

// Get All JoiningList 
exports.GetJoiningList = async (req, res, next) => {
  try {
    const SelectedCandidate = await SelectedCandidateModel.find();
    
    const addJobs = await AddJob.find();
    const applicationLists = await ApplicationList.find();
  

    return res.status(200).json({
      JobData: addJobs,
      ApplicantsList: applicationLists,
      SelectedCandidate: SelectedCandidate,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};


exports.updateJoiningList = async (req, res, next) => {
try {
  
  const updatedApplicant = await SelectedCandidateModel.findByIdAndUpdate(
    id,
    req.body,
    { new: true }
  );
} catch (error) {
  return res.status(400).json({ message: err.message }); 
}}

// get SingleJoiningList
exports.SingleJoiningList = async (req, res, next) => {
   try {
    const { id } = req.params;
    const SingleList = await SelectedCandidateModel.findById(id);
    
    // Check if SingleList exists and has the Applicant_id property
    if (!SingleList || !SingleList.Applicant_id) {
      return res.status(404).json({ message: 'Selected candidate not found or missing Applicant_id' });
    }

    // Assuming Applicant_id is a valid ID for ApplicationList
    const Applicant = await ApplicationList.findById(SingleList.Applicant_id);

    if (!Applicant) {
      return res.status(404).json({ message: 'Associated applicant not found' });
    }
    // Assuming Job_id is a valid ID for JobList
    const addJobs = await AddJob.findById(Applicant.Job_id);

    if (!addJobs) {
      return res.status(404).json({ message: 'Associated Job not found' });
    }

  // Create a new object with the desired fields
  const data = {
    _id: SingleList._id,
    EmployeeCode: SingleList.EmployeeCode,
    Status: SingleList.Status,
    Name: Applicant.Name,
    Designation: addJobs.Designation
  
  };

  return res.status(200).json({ Data: data });
 } catch (error) {
  return res.status(400).json({ message: error.message });
 }
};







  