const express = require("express");
const JobPost = require("../controller/AddJobPost");
const router = express.Router();
 
// Create Job Category

router.post("/category/add/new", JobPost.CreateCategory);

//  Get Job Category 
router.get("/category/all", JobPost.get);


// Job Create
router.post("/add/new", JobPost.Create);

//  Get Single job 
router.get("/getSingle/:id", JobPost.get);

// GetAll job 
router.get("/all", JobPost.getAll);

// job  Updated
router.put("/update/:id", JobPost.Update);

// job Delete
router.delete("delete/:id", JobPost.Delete);


module.exports = router;