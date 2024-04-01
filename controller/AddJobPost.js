
const AddJob = require('../Schema/AddJobSchema'); // Import your AddJob Schema

// CREATE - Add a new job
exports.Create = async (req, res, next) => {
  try {
    const newJob = await AddJob.create(req.body);
    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({message: err.message });
  }
};

// READ - Get all jobs
exports.getAll = async (req, res, next) => {
  try {
    const jobs = await AddJob.find();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({message: 'Internal Server Error' });
  }
};

// READ - Get a single job by ID
exports.get = async (req, res, next) => {
  try {
    const job = await AddJob.findById(req.params.id);
    if (!job) {
      return res.status(404).json({message: 'Job not found' });
    }
    res.status(200).json(job);
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
    res.status(200).json(updatedJob);
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
    res.status(204).end();
  } catch (err) {
    res.status(500).json({message: 'Internal Server Error' });
  }
};


