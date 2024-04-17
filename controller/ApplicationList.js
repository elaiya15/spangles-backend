const express = require("express");
const ApplicationList = require("../Schema/ApplicationSchema");
const ShortlistedApplicant = require("../Schema/ShortListed");




exports.GetApplicationList = async (req, res, next) => {
  try {
    const Applicant = await ApplicationList.find()
    
    return res.status(201).json(Applicant);
  } catch (err) {
    return res.status(500).json({message: 'Internal Server Error'});
  }
};

// /admin/hiring/joining-form/list/all

/// CreateApplicationList
exports.CreateApplicationList = async (req, res, next) => {
  try {
    const newApplicant = new ApplicationList(req.body);
    await newApplicant.save();
    return res.status(201).json(newApplicant);
  } catch (err) {
    return res.status(500).json({message: 'Internal Server Error'  });
  }
};

// Update an applicant by ID
exports.UpdateApplicationList = async (req, res, next) => {
  try 
  {
    const { id } = req.params;

    // const  CheckStatus = await ApplicationList.findById(id)
    // if (CheckStatus.Status === req.body.Status) {
    //   return res.status(404).json({message:  `Status  Already ${req.body.Status}` });
    // }

    const updatedApplicant = await ApplicationList.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    // Check if the status is being updated to "Shortlist"
    if (updatedApplicant.Status === "Shortlisted") {
      // // Create a new shortlisted applicant based on the updated data
      // const shortlistedApplicantData = { ...updatedApplicant.toObject() };
      // // Remove the status field
      
      const shortlistedApplicant = new ShortlistedApplicant(
        { Applicant_id:id}
      );

      // Save the shortlisted applicant to the new collection
      await shortlistedApplicant.save();
      return res.status(201).json({message: 'Applicant Shortlisted.'});
    }
    // If status is not "Shortlist", return the updated applicant
    return res.status(201).json({message: 'Applicant Status Updated Successfully.'});
  } catch (err) {
    return res.status(500).json({message: 'Internal Server Error'});
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
