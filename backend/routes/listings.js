const express = require('express')
const {
  createListing,
  getListings,
  getListing,
  deleteListing,
  updateListing
} = require('../controllers/listingController')

const router = express.Router()

// GET all workouts
router.get('/', getListings)

//GET a single workout
router.get('/:id', getListing)

// POST a new workout
router.post('/', createListing)

// DELETE a workout
router.delete('/:id', deleteListing)

// UPDATE a workout
router.patch('/:id', updateListing)


module.exports = router