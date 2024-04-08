const express = require("express");

const Selected = require("../controller/SelectedCandidate");


const router = express.Router();
// router path = /selected

router.get("/list/all", Selected.GetApplicationList);
// create interview round
router.post("/interview/", Selected.createInterviewRound);
// update interview round 
router.put("/updateInterview/", Selected.updateInterviewRound);
// Shortlisted Candidate Updated & create new Employee
router.put("/:id", Selected.UpdateShortList);
// router.post("/signin", Selected.signin);

module.exports = router;