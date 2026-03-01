const express = require('express');
const router = express.Router();
const { uploadFile, handleUpload } = require('../controllers/uploadController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, uploadFile, handleUpload);

module.exports = router;
