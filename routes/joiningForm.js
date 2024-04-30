const express = require("express");

const auth = require("../models/auth");
const Selected = require("../controller/SelectedCandidate");

const router = express.Router();

//  get all Joining list

router.get("/list/all", Selected.GetJoiningList);

//    SendMail To joining list Candidate

router.put("/SendMail/:id", Selected.SendMailJoiningList);  

//    re-SendMail To joining list Candidate

router.put("/Re-SendMail/:id", Selected.Re_SendMailJoiningList);  

//  get single joining get to sent client side

router.get("/employee-details/:id", Selected.SingleJoiningList);

// update_Client_Joining_Form

router.post("/employee-details/update/:id", Selected.update_Client_Joining_Form);

router.put("/status/update/:id", Selected.ApproveJoining_Form);

// router.get("/EmployeeProfile", Selected.EmployeeProfile);

module.exports = router;
// admin/hiring/joining-form/employee-details/add/new
// admin/hiring/joining-form/status/update/:id
// admin/hiring/joining-form/resend/form/:id