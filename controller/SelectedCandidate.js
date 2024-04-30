const express = require("express");

const { AddJob, Category } = require("../Schema/AddJobSchema");
const ApplicationList = require("../Schema/ApplicationSchema");
const Templates = require("../Schema/TemplateSchema");
const ShortlistedApplicant = require("../Schema/ShortListed");
const SelectedCandidateModel = require("../Schema/SelectedCandidate.js");
const { User, Profiles } = require("../Schema/RegesterSchema");
const generateEmployeeCode = require("../Utils/EmployeeCodeGenerater.js");
const SendEmail = require("../Utils/sendEmail");
const { uploadFile, uploadPdfFile } = require("../controller/FileUpload");
const jwt = require("jsonwebtoken"); // For generating JWT tokens

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
      return res
        .status(404)
        .json({ message: "Shortlisted applicant not found" });
    }

    // Find the interview round with Round in the InterviewRounds array
    const roundIndex = shortlistedApplicant.InterviewRounds.findIndex(
      (round) => round.Round === InterviewData.Round
    );
    // console.log(roundIndex);
    if (roundIndex === -1) {
      return res.status(404).json({ message: "Interview  Round: not found" });
    }
    // Update the interview round data
    shortlistedApplicant.InterviewRounds[roundIndex] = InterviewData;

    await shortlistedApplicant.save();

    return res
      .status(200)
      .json({ message: "Interview Re-Schedule Successfully" });
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
    if (updatedApplicant.Result === "Selected") {
      // Generate EmployeeCode
      const EmployeeCode = await generateEmployeeCode();
      // Create a new SelectedCandidate applicant based on the updated data
      const Selected = { ...updatedApplicant.toObject() };
      delete Selected._id; // Remove the _id field
      delete Selected.Result; // Remove the status field
      delete Selected.InterviewStatus; // Remove the InterviewStatus field
      delete Selected.InterviewMode; // Remove the InterviewMode field
      delete Selected.InterviewRounds; // Remove the InterviewMode field
      Selected.EmployeeCode = EmployeeCode;

      // Create a new instance of SelectedCandidate and save it
      const newSelectedCandidate =  new SelectedCandidateModel(Selected);
      await newSelectedCandidate.save();
      return res.status(201).json({ message: "Applicant Selected" });
    }

    // If status is not "Selected", return the updated applicant
    return res.status(201).json({ message: "Status Updated Successfully" });
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

// updateJoiningList
exports.SendMailJoiningList = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await SelectedCandidateModel.findById(id);
    // / Assuming Applicant_id is a valid ID for ApplicationList
    const Applicant = await ApplicationList.findById(user.Applicant_id);
    // console.log(Applicant);
    // Generate a Verify JWT token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    const updatedApplicant = await SelectedCandidateModel.findByIdAndUpdate(
      id,
      { Status: "Waiting", VerifyToken: token },
      { new: true }
    );
    if (updatedApplicant) {
      const subject = "Profile details";
      const text = `This Link Valid For 2 MINUTES http://localhost:5173/office-management/admin/hiring/joining-form/${id}/add/details?token=${updatedApplicant.VerifyToken}`;

      // Sent Mail
      const Mail = await SendEmail(res, Applicant.Email, subject, text);
      return Mail;
    } else {
      return res.status(400).json({ message: "No applicant found" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Re-SendMailJoiningList
exports.Re_SendMailJoiningList = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await SelectedCandidateModel.findById(id);
    // / Assuming Applicant_id is a valid ID for ApplicationList
    const Applicant = await ApplicationList.findById(user.Applicant_id);

    // Generate a Verify JWT token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    const updatedApplicant = await SelectedCandidateModel.findByIdAndUpdate(
      id,
      { Status: "Waiting", VerifyToken: token },
      { new: true }
    );
    if (updatedApplicant) {
      const subject = "Profile details";
      const text = `This Link Valid For 2 MINUTES https://front-end-pass.vercel.app/Profile-details/${id}?token=${updatedApplicant.VerifyToken}`;

      // Sent Mail
      const Mail = await SendEmail(res, Applicant.Email, subject, text);
      return Mail;
    } else {
      return res.status(400).json({ message: "No applicant found" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// get SingleJoiningList to sent  client Joining form useEffect
exports.SingleJoiningList = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization;

    // const {VerifyToken}= await SelectedCandidateModel.findById(id);
    const SingleList = await SelectedCandidateModel.findById(id);

    
    if (SingleList.VerifyToken === token) {
      if (SingleList.Status==="Waiting" ) {
        // Check if SingleList exists and has the Applicant_id property
    if (!SingleList || !SingleList.Applicant_id) {
      return res.status(404).json({
        message: "Selected candidate not found or missing Applicant_id",
      });
    }

    // Assuming Applicant_id is a valid ID for ApplicationList
    const Applicant = await ApplicationList.findById(SingleList.Applicant_id);
    const SelectedApplicant = { ...Applicant.toObject() };

    if (!Applicant) {
      return res
        .status(404)
        .json({ message: "Associated applicant not found" });
    }
    // Assuming Job_id is a valid ID for JobList
    const addJobs = await AddJob.findById(Applicant.Job_id);

    if (!addJobs) {
      return res.status(404).json({ message: "Associated Job not found" });
    }

    SelectedApplicant.Designation = addJobs.Designation;

    return res
      .status(200)
      .json({ employee_details: SingleList, ApplicantList: SelectedApplicant });
      } else {
        return res.status(403).json({ message: "Form Already Submitted " });
      }


    } else {
      return res.status(401).json({ message: "Unauthorized Token" });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
// update client Joining form
exports.update_Client_Joining_Form = async (req, res, next) => {
  try {
    const id = req.params.id;
    const  data  = JSON.parse(req.body.data);
 
    const awsImgUpload = await uploadFile(data.ProfileImage, id);
    data.ProfileImage = awsImgUpload;

    async function uploadAllPdfFiles(EducationQualification, id) {
      const dataEducation = [];

      for (let i = 0; i < EducationQualification.length; i++) {
        const pdfData = EducationQualification[i].pdf;
        const Qualification = EducationQualification[i].Qualification;
        const pdf = await uploadPdfFile(pdfData, id, Qualification);

        // Push an object with Qualification and pdf properties to data array
        dataEducation.push({ Qualification, pdf });
      }
      return dataEducation;
    }

    // Call uploadAllPdfFiles function
    const PdfFiles = await uploadAllPdfFiles(data.EducationQualification, id);
  
    data.EducationQualification = PdfFiles;
    data.Status = "In Progress";

    const updatedClient = await SelectedCandidateModel.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );
    // console.log(updatedClient);

    return res.status(201).json({ message: updatedClient });
  } catch (error) {
    // Changed from 'err' to 'error'
    return res.status(400).json({ message: error.message }); // Changed from 'err.message' to 'error.message'
  }
};
// update_Client_Joining_Form()
exports.ApproveJoining_Form = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedClient = await SelectedCandidateModel.findById(id)
     const Applicant = await ApplicationList.findById(updatedClient.Applicant_id);
  
    if (!Applicant) {
      return res.status(404).json({ message: "Applicant not found" });
    }
    const addJobs = await AddJob.findById(Applicant.Job_id);

    if (!addJobs) {
      return res.status(404).json({ message: "Associated Job not found" });
    }

    const newEmployeeProfile = { ...updatedClient.toObject() };
    const exitingProfile = { ...Applicant.toObject() };
    newEmployeeProfile.Designation = addJobs.Designation;

  //  console.log("exitingProfile:",exitingProfile.AlternativeMobileNumber);
    delete newEmployeeProfile._id;
    delete newEmployeeProfile.Applicant_id;
    delete newEmployeeProfile.VerifyToken;
    delete newEmployeeProfile.Status;

    newEmployeeProfile.Name=exitingProfile.Name,
    newEmployeeProfile.Resume=exitingProfile.Resume,
    newEmployeeProfile.Email=exitingProfile.Email,
    newEmployeeProfile.AlternativeMobileNumber=exitingProfile.AlternativeMobileNumber,
    newEmployeeProfile.MobileNumber=exitingProfile.MobileNumber

    const StatusUpdated= await SelectedCandidateModel.findByIdAndUpdate(
      id,
      { $unset: { VerifyToken: 1 } }, // Use $unset to remove the 'VerifyToken' field
      { Status: "Approved" },
      { new: true }
    );
   if (StatusUpdated) {
    //  Create a new profile
    const newProfile = new Profiles(newEmployeeProfile);
    const savedProfile = await newProfile.save();
   }
    return res.status(200).json({ message: "Employee Approved successfully " });
  } catch (error) {
    // Changed from 'err' to 'error'
    return res.status(400).json({ message: error.message }); // Changed from 'err.message' to 'error.message'
  }
};
