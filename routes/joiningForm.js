const express = require("express");

const Selected = require("../controller/SelectedCandidate");

const router = express.Router();

//  get all Selected list
router.get("/list/all", Selected.GetJoiningList);



module.exports = router;