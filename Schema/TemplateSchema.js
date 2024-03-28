 


 const mongoose = require("mongoose");
 const Schema = mongoose.Schema;

const TemplateSchema = new Schema({
  TemplateName: { type: String, trim: true }, 
  Description: { type: String, trim: true }, 
  EffectiveDate: { type: String, trim: true }, 
  
  });
   
  const Templates = mongoose.model('Templates',TemplateSchema );
  
  module.exports = Templates;