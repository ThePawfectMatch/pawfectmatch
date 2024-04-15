require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const listingRoutes = require('./routes/listings')
const userRoutes = require('./routes/user')
const uploadRoutes = require('./routes/upload')
const openAIRoutes = require('./routes/openai')
const compatibilityRoutes = require('./routes/compatibility')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/listings', listingRoutes)
app.use('/api/user', userRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/openai', openAIRoutes)
app.use('/api/compatibility', compatibilityRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })