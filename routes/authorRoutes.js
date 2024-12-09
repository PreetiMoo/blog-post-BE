const express = require('express');
const Author = require('../models/Author');
const router = express.Router();

router.get('/authors', async (req, res) => {
  try {
    const authors = await Author.find({}, 'name'); 
    res.status(200).json(authors);
  } catch (error) {
    console.error('Error fetching authors:', error);
    res.status(500).json({ message: 'Error fetching authors', error });
  }
});

module.exports = router;
