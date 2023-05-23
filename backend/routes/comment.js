const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/fetchuser');
const Story = require('../models/Story');
const Comment = require('../models/Comment');

// Create a new comment on a story
router.post('/comments/:storyId', auth, [
  body('text', 'Comment text is required').trim().notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { text } = req.body;
    const newComment = new Comment({
      text,
      story: req.params.storyId,
      user: req.user.id
    });

    await newComment.save();
    res.json(newComment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Get all comments of a story
router.get('/comments/:storyId', async (req, res) => {
  try {
    const comments = await Comment.find({ story: req.params.storyId }).populate('user', ['username']);
    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Update a comment
router.put('/comments/:commentId', auth, [
  body('text', 'Comment text is required').trim().notEmpty()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { text } = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      { text },
      { new: true }
    ).populate('user', ['username']);

    if (!updatedComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.json(updatedComment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a comment
router.delete('/comments/:commentId', auth, async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndRemove(req.params.commentId);

    if (!deletedComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
