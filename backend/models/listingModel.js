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
    type: [Object],
    required: false
  },
  bio: {
    type: String,
    required: false
  },
  hypoallergenic: {
    type: Object,
    required: false
  },
  age: {
    type: Object,
    required: false
  },
  size: {
    type: Object,
    required: false
  },
  energy: {
    type: [Object],
    required: false
  },
  training: {
    type: Object,
    required: false
  },
  weight: {
    type: String,
    required: false
  },
  contactPhone: {
    type: String,
    required: false
  },
  contactEmail: {
    type: String,
    required: false
  }
}, { timestamps: true })

module.exports = mongoose.model('Listing', listingSchema)