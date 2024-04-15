const express = require('express')

const { computeCompatibility } = require('../controllers/compatibilityController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.get('/', requireAuth, computeCompatibility)

module.exports = router