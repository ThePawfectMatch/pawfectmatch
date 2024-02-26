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
    breed: {
        type: String,
        required: true
    },
}, {timestamps: true })

// model applies schema to a particular model
module.exports = mongoose.model('Listing', listingSchema)