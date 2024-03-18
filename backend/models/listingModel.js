const mongoose = require('mongoose')

const Schema = mongoose.Schema

const listingSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  picPaths: {
    type: [String],
    required: false
  },
  breed: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  traits: {
    type: [String],
    required: false
  },
  bio: {
    type: String,
    required: false
  }
}, { timestamps: true })

module.exports = mongoose.model('Listing', listingSchema)