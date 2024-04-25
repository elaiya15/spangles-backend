const express = require("express");

const Selected = require("../controller/SelectedCandidate");

const router = express.Router();

//  get all Joining list

router.get("/list/all", Selected.GetJoiningList);

//  Update  joining list Candidate

router.put("/update/:id", Selected.updateJoiningList);

//  get single joining get to sent client side

router.get("/employee-details/:id", Selected.SingleJoiningList);

// update_Client_Joining_Form
router.put("/clientUpdate/:id", Selected.update_Client_Joining_Form);

module.exports = router;