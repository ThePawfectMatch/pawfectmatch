const express = require('express')
const {
    getListings,
    getListing,
    createListing,
    deleteListing,
    updateListing
} = require('../controllers/listingController')

const router = express.Router()

// GET all listings
router.get('/', getListings)

// GET a single listing
router.get('/:id', getListing)

// POST a new listing
router.post('/', createListing)

// DELETE a listing
router.delete('/:id', deleteListing)

// UPDATE a listing
router.patch('/:id', updateListing)

module.exports = router