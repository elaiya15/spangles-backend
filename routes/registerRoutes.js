const express = require("express");
const register = require("../controller/User");
const User = require("../controller/UserProfile");
const auth = require("../models/auth");

const router = express.Router();

router.post("/signup", register.signup);
router.post("/signin", register.signin);

router.get("/get",  User.get);
// router.get("/get",auth.authenticateUser, auth.authorizeUser , UserProfile.get);
module.exports = router;