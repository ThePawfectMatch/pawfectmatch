const express = require('express')

const { computeCompatibility } = require('../controllers/compatibilityController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.get('/:_id', computeCompatibility)

module.exports = router