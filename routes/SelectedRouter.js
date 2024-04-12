const express = require("express");

const Selected = require("../controller/SelectedCandidate");


const router = express.Router();

//  get all Selected list
router.get("/list/all", Selected.GetApplicationList);

// create interview round
router.post("/schedule/interview/:id", Selected.createInterviewRound);

// Reschedule interview round 
router.post("/reschedule/interview/:id", Selected.reInterviewRound);

// Shortlisted Candidate Updated & create new Employee
router.put("/interview/status/update/:id", Selected.UpdateShortList);

module.exports = router;