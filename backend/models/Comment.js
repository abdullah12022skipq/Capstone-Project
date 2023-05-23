const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  story: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.model('Comment', commentSchema, 'Comments');

module.exports = Comment;