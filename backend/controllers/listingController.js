const Listing = require('../models/listingModel')
const mongoose = require('mongoose')

// get all listings
const getListings = async (req, res) => {
  const listings = await Listing.find({}).sort({createdAt: -1})

  res.status(200).json(listings)
}

// get a single listing
const getListing = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such listing'})
  }

  const listing = await Listing.findById(id)

  if (!listing) {
    return res.status(404).json({error: 'No such listing'})
  }
  
  res.status(200).json(listing)
}


// create new listing
const createListing = async (req, res) => {
  const {title, load, reps} = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push('name')
  }
  if(!load) {
    emptyFields.push('type')
  }
  if(!reps) {
    emptyFields.push('breed')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const listing = await Listing.create({title, load, reps})
    res.status(200).json(listing)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a listing
const deleteListing = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such listing'})
  }

  const listing = await Listing.findOneAndDelete({_id: id})

  if (!listing) {
    return res.status(400).json({error: 'No such listing'})
  }

  res.status(200).json(listing)
}

// update a listing
const updateListing = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such listing'})
  }

  const listing = await Listing.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!listing) {
    return res.status(400).json({error: 'No such listing'})
  }

  res.status(200).json(listing)
}


module.exports = {
  getListings,
  getListing,
  createListing,
  deleteListing,
  updateListing
}