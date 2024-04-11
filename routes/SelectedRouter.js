const express = require("express");

const Selected = require("../controller/SelectedCandidate");


const router = express.Router();
// router path = /selected

router.get("/list/all", Selected.GetApplicationList);
// create interview round
router.post("/schedule/interview/:id", Selected.createInterviewRound);
// router.post("/reschedule/interview/:id", Selected.reInterviewRound);
// update interview round 
// router.put("/updateInterview", Selected.updateInterviewRound);
// Shortlisted Candidate Updated & create new Employee
router.put("/:id", Selected.UpdateShortList);
// router.post("/signin", Selected.signin);
module.exports = router;