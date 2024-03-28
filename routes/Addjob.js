const express = require("express");
const JobPost = require("../controller/AddJobPost");
const router = express.Router();
 


// Templeta Create
router.post("/", JobPost.Create);

//  Get Single Templeta 
router.get("/getSingle", JobPost.get);

// GetAll Templeta 
router.get("/", JobPost.getAll);

// Templeta  Updated
router.put("/:id", JobPost.Update);

// Templeta Delete
router.delete("/:id", JobPost.Delete);


module.exports = router;