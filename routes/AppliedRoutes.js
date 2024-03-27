const express = require("express");
const apply = require("../controller/ApplicationList");
const User = require("../controller/UserProfile");
const router = express.Router();
const auth = require("../models/auth");


// ApplicationList created router
router.post("/", apply.CreateApplicationList);
router.get("/", apply.GetApplicationList);
// ApplicationList Status update router  & Shortlisted Created
router.put("/:id", apply.UpdateApplicationList);

// router.get("/get",  User.get);
// router.get("/get",auth.authorizeUser , User.get);

// router.get("/get",auth.authenticateUser, auth.authorizeUser , UserProfile.get);
module.exports = router;