const express = require('express');
const router = express.Router();
const bookRoutes = require('./books');
const googleRoutes = require('./google');

// Book routes (/api/books)
router.use('/books', bookRoutes);

// Google routes (/api/google)
router.use('/google', googleRoutes);

module.exports = router;