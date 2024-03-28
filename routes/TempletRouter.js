const express = require("express");
const router = express.Router();
const Template = require("../controller/Template");

//  Create Templeta 
router.post("/add/new", Template.Create);

// GetAll Templeta 
router.get("/all", Template.getAll);

//  Get Single Templeta 
router.get("/getSingle/:id", Template.get);

// Updated  Templeta 
router.put("/update/:id", Template.Update);


// Updated  Templeta 
router.delete("delete/:id", Template.deleteTemplate);


module.exports = router;