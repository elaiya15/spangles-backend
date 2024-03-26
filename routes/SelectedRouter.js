const express = require("express");

const Selected = require("../controller/SelectedCandidate");


const router = express.Router();
// router path = /selected

router.get("/", Selected.GetApplicationList);
// Shortlisted Candidate Updated & create new Employee
router.put("/:id", Selected.UpdateShortList);
// router.post("/signin", Selected.signin);

module.exports = router;