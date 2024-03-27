const jwt = require("jsonwebtoken");

// Authentication
exports.authenticateUser = (req, res, next) => {
  // Check whether access token exists in headers
  if (!req.headers.accesstoken)
    return res.status(400).send({ msg: "Token not found" });

  // Verify Token
  try {
    const user = jwt.verify(req.headers.accesstoken, process.env.SECRET_KEY);
    req.body.currentuser = user;
    console.log(user)
    
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).send({ msg: "Unauthorised" });
  }
};

// Authorisation
exports.authorizeUser = (req, res, next) => {
  if (req.body.currentuser.role === "hr"||"manager") 
  next();
  else
    return res
      .status(403)
      .send({ msg: "Forbidden : No permission to access API" });
};
