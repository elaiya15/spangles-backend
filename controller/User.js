const express = require('express');
const {User,Profiles} = require('../Schema/RegesterSchema'); // Import your User model
const bcrypt = require('bcrypt'); // For hashing passwords
const router = express.Router();
const jwt = require('jsonwebtoken'); // For generating JWT tokens

exports.signup = async (req, res, next) => {
  const { UserName, Password, EmployeeType, Profile } = req.body;

  try {
    const existingUser = await User.findOne({ UserName });
    if (existingUser) {
      return res.status(400).json({ message: 'UserName is already registered.' });
    }
    // Update new profile
    const id = req.params.id; 
    const ProfileUpdated = await Profiles.findByIdAndUpdate(
      id,
      Profile,
      { new: true }
    );
    // Hash the password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Create a new user and link it to the profile
    const newUser = new User({
      UserName,
      Password: hashedPassword,
      EmployeeType,
      Profile: ProfileUpdated._id
    });

    // Save the new user
    const savedUser = await newUser.save();

    return res.status(201).json({ user: savedUser, profile: savedProfile });
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Handle validation errors
      const validationErrors = {};
      for (const field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }
      return res.status(400).json({ message: validationErrors });
    } else {
      // Handle other types of errors
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};


exports.signin = async (req, res, next) => {
  const { UserName, Password } = req.body;
  try {
    // Find the user by username
    const user = await User.findOne({ UserName })
      .select('+Password')
      .lean();

    if (!user) {
      return res.status(404).json({ message: 'User not Found.' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordMatch = await bcrypt.compare(Password, user.Password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid Password.' });
    }

    // Find the profile based on the ObjectId stored in the user's Profile field
    const profile = await Profiles.findById(user.Profile).select('_id Name ProfileImage').lean();

    // Merge profile data into the user object
    user.Name = profile.Name;
    user.ProfileImage = profile.ProfileImage;

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, role: user.EmployeeType }, process.env.SECRET_KEY, { expiresIn: '1d' });

    // Remove unwanted fields from the user object
    delete user.Password;
    delete user.Profile;
    delete user.UserName;
    delete user.__v;

    // Send the token, user data, and selected profile fields as a response
    res.status(200).json({ message: 'Login Successful', token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

