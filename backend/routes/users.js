const express = require('express')

const router = express.Router()

// Get ALL users
router.get('/', (req, res) => {
    res.json({mssg: 'GET all users'})
})

// Get a single user
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single user'})
})

router.post('/', (req, res) => {
    res.json({mssg: 'POST a new user'})
})

router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a user'})
})

router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a user'})
})

module.exports = router