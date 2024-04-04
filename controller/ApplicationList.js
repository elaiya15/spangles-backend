const express = require("express");
const ApplicationList = require("../Schema/ApplicationSchema");
const ShortlistedApplicant = require("../Schema/ShortListed");




exports.GetApplicationList = async (req, res, next) => {
  try {
    const Applicant = await ApplicationList.find()
    
    return res.status(201).json(Applicant);
  } catch (err) {
    return res.status(400).json({ message: 'Data Not Found'  });
  }
};


/// CreateApplicationList
exports.CreateApplicationList = async (req, res, next) => {
  try {
    const newApplicant = new ApplicationList(req.body);
    await newApplicant.save();
    return res.status(201).json(newApplicant);
  } catch (err) {
    return res.status(400).json({message: 'Internal Server Error'  });
  }
};

// Update an applicant by ID
exports.UpdateApplicationList = async (req, res, next) => {
  try 
  {
    const { id } = req.params;

    const  CheckStatus = await ApplicationList.findById(id)
    if (CheckStatus.status === req.body.status) {
      return res.status(404).json({message:  `Status  Already ${req.body.status}` });
    }

    const updatedApplicant = await ApplicationList.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    // Check if the status is being updated to "Shortlist"
    if (updatedApplicant.status === "Shortlist") {
      // Create a new shortlisted applicant based on the updated data
      const shortlistedApplicantData = { ...updatedApplicant.toObject() };
      delete shortlistedApplicantData._id; // Remove the _id field
      delete shortlistedApplicantData.status; // Remove the status field
      
      const shortlistedApplicant = new ShortlistedApplicant(
        shortlistedApplicantData
      );

      // Save the shortlisted applicant to the new collection
      await shortlistedApplicant.save();
      return res.status(201).json({ updatedApplicant: updatedApplicant ,shortlistedApplicant:shortlistedApplicant});
    }
    // If status is not "Shortlist", return the updated applicant
    return res.status(200).json({update:updatedApplicant});
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// Delete an applicant by ID
// app.delete('/applicants/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Applicant.findByIdAndDelete(id);
//     res.sendStatus(204);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });
