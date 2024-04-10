const express = require('express')

// controller functions
const { loginUser, signupUser, updateUser, getUser } = require('../controllers/userController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

router.patch('/', requireAuth, updateUser)

router.get('/', requireAuth, getUser)

module.exports = router