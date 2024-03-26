const express = require("express");
const apply = require("../controller/ApplicationList");

const router = express.Router();


// ApplicationList created router
router.post("/", apply.CreateApplicationList);
router.get("/", apply.GetApplicationList);
// ApplicationList Status update router  & Shortlisted Created
router.put("/:id", apply.UpdateApplicationList);



// router.get("/get",auth.authenticateUser, auth.authorizeUser , UserProfile.get);
module.exports = router;