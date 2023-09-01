const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  text: {
    type: String
  },
  media: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Like'
  }],
  downvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Like'
  }],
}, {
  timestamps: true
});

const Story = mongoose.model('Story', postSchema, 'Story');

module.exports = Story;