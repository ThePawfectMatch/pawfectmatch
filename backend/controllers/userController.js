const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password, picPath, firstName, lastName, phoneNumber, 
    zipcode, bio, accountType, livingArrangements, lifestyleTraits, petPreferences, experience, space} = req.body
  try {
    const user = await User.signup(email, password, picPath, firstName, lastName, phoneNumber, 
      zipcode, bio, accountType, livingArrangements, lifestyleTraits, petPreferences, experience, space)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token}) // come back to this on if we should pass in all these values 
  } 
  catch (error) {
    res.status(400).json({error: error.message})
  }
}

const updateUser = async (req, res) => {
  const id = req.user
  try {
    const {picPath, firstName, lastName, phoneNumber, 
      zipcode, bio, accountType, livingArrangements, lifestyleTraits, petPreferences, experience, space} = req.body
    const updateFields = {};
    if (picPath) updateFields.picPath = picPath;
    if (firstName) updateFields.firstName = firstName;
    if (lastName) updateFields.lastName = lastName;
    if (phoneNumber) updateFields.phoneNumber = phoneNumber;
    if (zipcode) updateFields.zipcode = zipcode;
    if (bio) updateFields.bio = bio;
    if (accountType) updateFields.accountType = accountType;
    if (livingArrangements) updateFields.livingArrangements = livingArrangements;
    if (lifestyleTraits) updateFields.lifestyleTraits = lifestyleTraits;
    if (petPreferences) updateFields.petPreferences = petPreferences;
    if (experience) updateFields.experience = experience;
    if (space) updateFields.space = space;
    
    const updatedUser = await User.findByIdAndUpdate(id, updateFields, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({user: updatedUser}) // maybe we shouldn't pass the whole user here, come back to this.
  } 
  catch (error) {
    res.status(400).json({error: error.message})
  }
}

const getUser = async (req, res) => {
  const id = req.user
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such user'})
    }
  
    const user = await User.findById(id).select('-password'); // later maybe change if we need to use this to check that their password isn't this?
  
    if (!user) {
      return res.status(404).json({error: 'No such user'})
    }
  
    res.status(200).json({user: user})
  }
  catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser, updateUser, getUser }