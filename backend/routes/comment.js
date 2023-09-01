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

    // Find the story and add the comment reference to the comments array
    const story = await Story.findById(req.params.storyId);
    if (!story) {
      return res.status(404).json({ success: false, message: 'Story not found' });
    }
    story.comments.push(newComment._id);
    await story.save();

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

    const updatedComment = await Comment.findOneAndUpdate(
      { _id: req.params.commentId, user: req.user.id },
      { text },
      { new: true }
    ).populate('user', ['username']);

    if (!updatedComment) {
      return res.status(404).json({ error: 'Comment not found or you are not authorized to update this comment' });
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
    const { commentId } = req.params;

    const deletedComment = await Comment.findOneAndDelete({ _id: commentId, user: req.user.id });

    if (!deletedComment) {
      return res.status(404).json({ error: 'Comment not found or you are not authorized to delete this comment' });
    }

    const storyId = deletedComment.story;
    const story = await Story.findById(storyId);

    if (!story) {
      return res.status(404).json({ success: false, message: 'Story not found' });
    }

    // Remove the comment reference from the story's comments array
    story.comments.pull(commentId);
    await story.save();

    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
