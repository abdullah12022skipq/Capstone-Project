const express = require('express');
const router = express.Router();
const auth = require('../middleware/fetchuser');
const Like = require('../models/Like');
const Story = require('../models/Story');

// Upvote a story
router.post('/upvote/:storyId', auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.storyId);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    let existingLike = await Like.findOne({ story: req.params.storyId, user: req.user.id });
    if (existingLike) {
      if (existingLike.vote === 1) {
        // Remove the existing upvote
        story.upvotes.pull(req.user.id);
        await story.save();
        await Like.deleteOne({ _id: existingLike._id });
        
        return res.status(200).json({ message: 'Upvote removed' });
      } else {
        story.downvotes.pull(req.user.id);
        await story.save();

        // Switching the vote from downvote to upvote
        existingLike.vote = 1;
      }
    } else {
      existingLike = new Like({
        story: req.params.storyId,
        user: req.user.id,
        vote: 1 // 1 represents an upvote
      });
    }

    await existingLike.save();

    story.upvotes.push(req.user.id);
    await story.save();

    res.json(existingLike);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Downvote a story
router.post('/downvote/:storyId', auth, async (req, res) => {
  try {
    const story = await Story.findById(req.params.storyId);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    let existingLike = await Like.findOne({ story: req.params.storyId, user: req.user.id });

    if (existingLike) {
      if (existingLike.vote === -1) {
        // Remove the existing downvote
        story.downvotes.pull(req.user.id);
        await story.save();

        await Like.deleteOne({ _id: existingLike._id });

        return res.status(200).json({ message: 'Downvote removed' });
      } else {
        story.upvotes.pull(req.user.id);
        await story.save();

        // Switching the vote from upvote to downvote
        existingLike.vote = -1;
      }
    } else {
      existingLike = new Like({
        story: req.params.storyId,
        user: req.user.id,
        vote: -1 // -1 represents a downvote
      });
    }

    await existingLike.save();

    story.downvotes.push(req.user.id);
    await story.save();

    res.json(existingLike);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Get all the upvotes and downvotes for a story
router.get('/getupvotesdownvotes/:storyId', async (req, res) => {
  try {
    const story = await Story.findById(req.params.storyId);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    const upvotes = await Like.find({ story: req.params.storyId, vote: 1 });
    const downvotes = await Like.find({ story: req.params.storyId, vote: -1 });

    const result = {
      upvotes: upvotes.length,
      downvotes: downvotes.length,
    };

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;