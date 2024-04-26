const { User, Profiles } = require("../Schema/RegesterSchema");




exports.EmployeeProfile = async (req, res, next) => {
  try {
    
    const Profile = await Profiles.find();

console.log(Profile);

    return res.status(200).json({ message: Profile });
  } catch (error) { // Changed from 'err' to 'error'
    return res.status(400).json({ message: error.message }); // Changed from 'err.message' to 'error.message'
  }
};