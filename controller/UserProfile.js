
// const {User,Profiles} = require('../Schema/RegesterSchema'); // Import your User model




exports.get =async(req, res) => {
  try {
      const UserProfiles = await Profiles.find()
      res.send(UserProfiles)
  } catch (error) {
      res.status(500).send(error.message)
  }
}
