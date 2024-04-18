const express = require('express')
const multer = require('multer')
const sharp = require('sharp')

const router = express.Router()

const requireAuth = require('../middleware/requireAuth')

const storage = multer.memoryStorage()

const upload = multer({ storage: storage });

// upload user image (no Authentication required to upload, will need to save path )
router.post('/user', upload.single('file'), async (req, res) => {
  const filename = Date.now() + '-' + req.file.originalname.split(' ').join('-')  
  const filePath = `./../frontend/public/images/uploads/${filename}`
  try {
    await sharp(req.file.buffer)
      .toFile(filePath)

    res.status(200).json({
        message: 'Uploaded successfully for listing',
        path: `/images/uploads/${filename}`
    })
  }
  catch (error) {
    console.log('Error processing file', error)
    res.status(400).json({ message:'Error processing file', error: error });
  }
  
})

// upload listing image (requires Authentication since listing tied to user)
router.post('/listing', requireAuth, upload.array('files', 4), async (req, res) => {
  try {
    const uploadedPaths = [];
    
    for (const file of req.files) {
      const filename = Date.now() + '-' + file.originalname.split(' ').join('-');
      const filePath = `./../frontend/public/images/uploads/${filename}`;
      
      await sharp(file.buffer)
        .toFile(filePath);
      
      uploadedPaths.push(`/images/uploads/${filename}`);
    }
    res.status(200).json({
      message: 'Uploaded successfully for listing',
      paths: uploadedPaths
    })
    
  }
  catch (error) {
    res.status(400).json({ message: 'No file uploaded' });
  }
})

module.exports = router