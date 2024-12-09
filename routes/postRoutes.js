const express = require('express');
const BlogPost = require('../models/BlogPost');
const Author = require('../models/Author');
const router = express.Router();


router.get('/search', async (req, res) => {
  try {
    const { query, date, author } = req.query;
    const filters = {};

    console.log(req.query);
    console.log('Date Query:', date);

    if (query) {
      filters.title = { $regex: query, $options: 'i' }; 
    }

    if (date) {
        const startOfDay = new Date(date);
        startOfDay.setUTCHours(0, 0, 0, 0); 

        const endOfDay = new Date(date);
        endOfDay.setUTCHours(23, 59, 59, 999); 

        filters.ctime = { $gte: startOfDay, $lte: endOfDay };
    }

    if (author) {
      const authorDoc = await Author.findOne({ name: author });
      if (authorDoc) {
        filters.author = authorDoc._id;
      } else {
        return res.status(404).json({ message: 'Author not found' });
      }
    }

    const posts = await BlogPost.find(filters).populate('author', 'name image').sort({ ctime: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error searching posts', error });
  }
});


router.get('/posts', async (req, res) => {
  try {
    const posts = await BlogPost.find().populate('author', 'name image').sort({ ctime: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
});


router.get('/post/:id', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate('author', 'name image');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post', error });
  }
});


module.exports = router;
