const express = require("express");
const auth = require("../models/auth");
const  Profile= require("../controller/EmployeeProfile");
const router = express.Router(); 



router.get("/list/all", Profile.EmployeeProfile);

module.exports = router;