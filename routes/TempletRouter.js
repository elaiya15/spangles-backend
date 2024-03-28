const express = require("express");
const router = express.Router();
const Template = require("../controller/Template");

//  Create Templeta 
router.post("/", Template.Create);

// GetAll Templeta 
router.get("/", Template.getAll);

//  Get Single Templeta 
router.get("/getSingle/:id", Template.get);

// Updated  Templeta 
router.put("/:id", Template.Update);


// Updated  Templeta 
router.delete("/:id", Template.deleteTemplate);


module.exports = router;