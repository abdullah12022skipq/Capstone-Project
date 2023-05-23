const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  description: {
    type: String,
  },
  text:{
    type: String,
  },
  media: {
    type: {
      type: String,
      enum: ['image', 'video', 'text'],
      default: 'text'
    },
    data: Buffer,
    contentType: String
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

const Story = mongoose.model('Story', storySchema, 'Story');
module.exports = Story;