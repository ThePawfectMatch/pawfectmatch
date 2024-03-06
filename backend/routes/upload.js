const express = require('express')
const multer = require('multer')

const router = express.Router()

const requireAuth = require('../middleware/requireAuth')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images')
  },
  filename: function (req, file, cb) {
    // Generate a unique filename
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

// upload user image (no Authentication required to upload, will need to save path )
router.post('/user', upload.single('file'), async (req, res) => {
    res.send('Uploaded successfully for user')
})

// upload listing image (requires Authentication since listing tied to user)
router.post('/listing', requireAuth, upload.array('files', 5), async (req, res) => {
    res.send('Uploaded successfully for listing')
})

module.exports = router