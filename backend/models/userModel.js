const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  picPath: {
    type: String,
    required: false
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  zipcode: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: false // come back to later
  },
  accountType: {
    type: Object,
    required: true
  },
  livingArrangements: {
    type: Object,
    required: false // for now
  },
  lifestyleTraits: {
    type: Object,
    required: false // for now
  },
  petPreferences: {
    type: Object,
    required: false // for now
  }
})

// static signup method
userSchema.statics.signup = async function(email, password, picPath, firstName, lastName, phoneNumber, 
  zipcode, bio, accountType, livingArrangements, lifestyleTraits, petPreferences) {
  // validation
  if (!email || !password || !firstName || !lastName || !phoneNumber || !zipcode || !accountType) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(password, {
    minSymbols: 0,
    minLength: 8,
    minNumbers: 1,
    minUppercase: 1
  })) {
    throw Error('Password not strong enough, must contain 8 chars, 1+ number, 1+ uppercase')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash, picPath, firstName, lastName, phoneNumber, 
    zipcode, bio, accountType, livingArrangements, lifestyleTraits, petPreferences})

  return user
}

// static login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)