const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
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
  vote: {
    type: Number,
    enum: [-1, 1], // -1 represents a downvote, 1 represents an upvote
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Like = mongoose.model('Like', likeSchema, 'Likes');

module.exports = Like;