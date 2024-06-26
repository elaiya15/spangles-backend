const Templates = require("../Schema/TemplateSchema");

// Post Templeta
exports.Create = async (req, res, next) => {
   
    try {
      const { TemplateName, EffectiveDate, Description,Status } = req.body;
      const newTemplates = new Templates({ TemplateName, EffectiveDate, Description,Status});
      const savedUser = await newTemplates.save();
      return res.status(201).json({message:'Template Created successfully',});
    } catch (err) {
      return  res.status(400).json({ message: "Template Created Filled"});
    }
  };

  // Get Templeta
exports.get = async (req, res, next) => {
   
    try {
        const getTemplates = await Templates.findById(req.params.id);
        if (!getTemplates) {
          return res.status(404).json({ message:  'Templates not found' });
        }
        res.status(200).json( {message:'Data Get successfully',getTemplates});
      } catch (err) {
        res.status(500).json({ message:  'Server error' });
      }
  };

    // Get All Templeta
exports.getAll = async (req, res, next) => {
   
    try {
        const AllGetTemplates = await Templates.find( );
        if (!AllGetTemplates) {
          return res.status(404).json({ message:  'Templates not found' });
        }
        res.status(200).json({message:'Data Get successfull',Data:AllGetTemplates});
      } catch (err) {
        res.status(500).json({ message:  'Server error' });
      }

  }; 

    // Update Templeta 
    
    
    exports.Update = async (req, res, next) => {
    try {
      const { TemplateName, Description, EffectiveDate,Status } = req.body;
      const templateId = req.params.id;
  
      // Validate that the required fields are provided in the request body
      if (!TemplateName || !Description || !EffectiveDate ||!Status) {
        return res.status(400).json({ message:  'Please provide TemplateName, Description, and EffectiveDate' });
      }
  
      // Update the template using findByIdAndUpdate
      const updatedTemplate = await Templates.findByIdAndUpdate(
        templateId,
        { TemplateName, Description, EffectiveDate,Status },
        { new: true } // Return the updated document
      );
  
      if (!updatedTemplate) {
        return res.status(404).json({ message:  'Template not found' });
      }
  
      return res.status(200).json( { message:  'Template updated SuccessFull'});
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message:  'Server error' });
    }
  };

  exports.deleteTemplate = async (req, res, next) => {
    try {
      const templateId = req.params.id;
  
      // Check if the template exists
      const existingTemplate = await Templates.findById(templateId);
      if (!existingTemplate) {
        return res.status(404).json({ message: 'Template not found' });
      }
  
      // Delete the template using findByIdAndDelete
      await Templates.findByIdAndDelete(templateId);
  
      return res.status(200).json({ message: 'Template deleted successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message:  'Server error' });
    }
  };
  