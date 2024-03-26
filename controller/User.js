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
      return res.status(400).json({ error: 'UserName is already registered.' });
    }

    // Create a new profile
    const newProfile = new Profiles(Profile);
    const savedProfile = await newProfile.save();

    // Hash the password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Create a new user and link it to the profile
    const newUser = new User({
      UserName,
      Password: hashedPassword,
      EmployeeType,
      Profile: savedProfile._id
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
      return res.status(400).json({ errors: validationErrors });
    } else {
      // Handle other types of errors
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};





exports.signin = async (req, res, next) => {
  const { UserName, Password } = req.body;
  // console.log(req.body);
  try {
    // Find the user by username
    const user = await User.findOne({ UserName }).select('+Password');
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordMatch = await bcrypt.compare(Password, user.Password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: 'Invalid password.' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, role: user.EmployeeType }, process.env.SECRET_KEY, { expiresIn: '1d' });
    // Send the token as a response
    res.status(200).json({ token ,user});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
};
