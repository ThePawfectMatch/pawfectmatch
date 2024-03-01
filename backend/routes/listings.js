const express = require('express')
const {
  createListing,
  getListings,
  getListing,
  deleteListing,
  updateListing
} = require('../controllers/listingController')
//This helps to restrict access if you are not logged in 
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//require auth for certain routes (Discuss this with group?)
router.use(requireAuth)

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