
const {AddJob,Category} = require('../Schema/AddJobSchema'); // Import your AddJob Schema
const ApplicationList = require("../Schema/ApplicationSchema");
// // CREATE - Add a new job
// exports.CreateCategory = async (req, res, next) => {
//   try {
//     const newCategory = await Category.create(req.body);
//     await newCategory.save();
//     return  res.status(201).json({message:"Category Added Successful",NewCategory:newCategory});
//   } catch (err) {
//     return  res.status(400).json({message: "Category NOT Added " });
//   }
// };



// // READ - getCategory all 
// exports.getCategory = async (req, res, next) => {
//   try {
//     const allCategory = await Category.find();
//     return res.status(200).json({message:"Job Category Get Successful",Category: allCategory});
//   } catch (err) {
//     return res.status(500).json({message: 'Internal Server Error' });
//   }
// };



//<------------JOB Add CODE Started Here------------>


// CREATE - Add a new job
exports.Create = async (req, res, next) => {
  console.log(req.body);
  try {
    const newJob = await AddJob.create(req.body);
    await newJob.save();
    return  res.status(201).json({message:"Job Added Successful"});
  } catch (err) {
    return  res.status(400).json({message: err.message });
  }
};

// READ - Get all jobs
exports.getAll = async (req, res, next) => {
  try {
      const Applicant = await ApplicationList.find()
    const jobs = await AddJob.find();
    return res.status(200).json({message:"Job Get Successful",JobData: jobs,ApplicantsList:Applicant});
  } catch (err) {
    return res.status(500).json({message: 'Internal Server Error' });
  }
};

// READ - Get a single job by ID
exports.get = async (req, res, next) => {
  try {
    const job = await AddJob.findById(req.params.id);
    if (!job) {
      return res.status(404).json({message: 'Job not found' });
    }
    return res.status(200).json(job);
  } catch (err) {
    res.status(500).json({message: 'Internal Server Error' });
  }
};

// UPDATE - Update a job by ID
exports.Update = async (req, res, next) => {
  try {
    const updatedJob = await AddJob.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedJob) {
      return res.status(404).json({message: 'Job not found' });
    }
    return res.status(200).json({message:"Update Successful"});
  } catch (err) {
    res.status(500).json({message: 'Internal Server Error' });
  }
};

// DELETE - Delete a job by ID
exports.Delete = async (req, res, next) => {
  try {
    const deletedJob = await AddJob.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({message: 'Job not found' });
    }
    return  res.status(204).json({message: 'Deleted Successful' } );
  } catch (err) {
    return res.status(500).json({message: 'Internal Server Error' });
  }
};


