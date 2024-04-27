const express = require("express");

const { AddJob, Category } = require("../Schema/AddJobSchema");
const ApplicationList = require("../Schema/ApplicationSchema");
const Templates = require("../Schema/TemplateSchema");
const ShortlistedApplicant = require("../Schema/ShortListed");
const SelectedCandidateModel = require("../Schema/SelectedCandidate.js");
const { User, Profiles } = require("../Schema/RegesterSchema");
const generateEmployeeCode = require("../Utils/EmployeeCodeGenerater.js");
const SendEmail = require("../Utils/sendEmail");
const uploadFile = require("../Utils/fileupload");
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

  // Check if SingleList exists and has the Applicant_id property
  if (!SingleList || !SingleList.Applicant_id) {
    return res
      .status(404)
      .json({
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
  
  return res.status(200).json({ employee_details: SingleList,ApplicantList:SelectedApplicant, });


    // if (SingleList.VerifyToken === token) {
   

    // } else {
    //   return res.status(401).json({ message: "Unauthorized Token" });
    // }

 

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
// update client Joining form
exports.update_Client_Joining_Form = async (req, res, next) => {
  try {
    const id = req.params.id;

    req.body.Status = "In Progress";
    const Data = {
      Designation: "Software Engineer",
      Name: "John Doe",
      EmployeeCode: "E12345",
      ProfileImage: "https://example.com/profile-image.jpg",
      JoiningDate: "2024-04-27",
      Gender: "Male",
      MaritalStatus: "Single",
      DateofBirth: "1990-01-01",
      EducationQualification: [
        {
          Qualification: "Bachelor of Science",
          pdf: "https://example.com/degree.pdf",
        },
        {
          Qualification: "Master of Science",
          pdf: "https://example.com/masters_degree.pdf",
        },
      ],
      PhoneNumber: "+1234567890",
      AlternativePhoneNumber: "+9876543210",
      EmailOffice: "john.doe@example.com",
      EmailPersonal: "john.doe.personal@example.com",
      BloodGroup: "O+",
      AadhaarNumber: "1234 5678 9012",
      AddressPresent: {
        AddressLine1: "123 Main St",
        AddressLine2: "Apt 456",
        City: "New York",
        District: "Manhattan",
        State: "NY",
        Country: "USA",
        ZipCode: "10001",
      },
      AddressPermanent: {
        AddressLine1: "456 Elm St",
        AddressLine2: "Unit 789",
        City: "Los Angeles",
        District: "LA",
        State: "CA",
        Country: "USA",
        ZipCode: "90001",
      },
      AccountNumber: "1234567890123456",
      IFSCCode: "ABCD0123456",
      BankName: "Example Bank",
      PANNumber: "ABCDE1234F",
    };

    console.log(req.body);
    const updatedClient = await SelectedCandidateModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    return res.status(200).json({ message: updatedClient });
  } catch (error) {
    // Changed from 'err' to 'error'
    return res.status(400).json({ message: error.message }); // Changed from 'err.message' to 'error.message'
  }
};

exports.ApproveJoining_Form = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedClient = await SelectedCandidateModel.findByIdAndUpdate(
      id,
      { Status: "Approved" },
      { new: true }
    );
    // console.log(updatedClient);
    const newEmployeeProfile = { ...updatedClient.toObject() };

    // Create a new profile
    const newProfile = new Profiles(newEmployeeProfile);
    const savedProfile = await newProfile.save();

    return res.status(200).json({ message: "Employee Approved successfully " });
  } catch (error) {
    // Changed from 'err' to 'error'
    return res.status(400).json({ message: error.message }); // Changed from 'err.message' to 'error.message'
  }
};
