const mongoose = require('mongoose');

const blogTagSchema = new mongoose.Schema({
  blogID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogPost',
    required: true,
  },
  tag: {
    type: [String],
    required: true,
  },
});

const BlogTag = mongoose.model('BlogTag', blogTagSchema);

module.exports = BlogTag;
