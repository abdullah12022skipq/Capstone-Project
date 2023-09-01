const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/fetchuser');
const User = require('../models/User');
const Story = require('../models/Story');
const Like = require('../models/Like')

const multer = require('multer');
const storage = require('../middleware/fetchmedia');

const upload = multer({ storage: storage('uploads/stories') });

// Create a new story
router.post(
  '/stories',
  auth,
  upload.single('media'),
  [
    body('text').optional().trim(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      if (!req.body.text && !req.file) {
        return res.status(400).json({ success: false, message: 'A story must contain either text or media' });
      }

      // Extract post data from the request body
      const { text } = req.body;
      const media = req.file ? req.file.path : null;
      const userId = req.user.id;

      // Find the user who is creating the story
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      // Create a new Story object
      const newStory = new Story({
        text: text ? text : null,
        media: media ? media : null,
        user: user._id, // Assign the reference to the user
      });

      // Save the story to the database
      await newStory.save();

      // Add the story reference to the user's stories array
      user.stories.push(newStory._id);
      await user.save();

      res.json(newStory);
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
    }
);

// Get all stories
router.get('/stories', async (req, res) => {
  try {
    const stories = await Story.find().populate('comments', 'user');
    res.json(stories);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Get all stories of a specific user
router.get('/users/stories/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Find the user by their ID
    const user = await User.findById(userId).populate('stories');
    
    if (!user) {
      // User not found
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    // Access the user's stories
    const stories = user.stories;
    
    res.json(stories);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


// Get a specific story
router.get('/stories/:storyId', async (req, res) => {
  try {
    const { storyId } = req.params;

    const story = await Story.findById(storyId)
      .populate('user', ['username'])

    if (!story) {
      return res.status(404).json({ success: false, message: 'Story not found' });
    }

    res.json(story);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


// Update a specific story
router.put('/stories/:storyId', auth, upload.single('media'), async (req, res) => {
  try {
    const { storyId } = req.params;
    const { text } = req.body;
    const media = req.file ? req.file.path : null;

    // Validate that the story contains either text or media, not both
    if ((!text && !media)) {
      return res.status(400).json({ success: false, message: 'A story must contain either text or media' });
    }

    const updatedFields = {};

    if (text && media) {
      updatedFields.text = text;
      updatedFields.media = media;
    }
    else if (text) {
      updatedFields.text = text;
      updatedFields.media = null;
    }
    else {
      updatedFields.text = null;
      updatedFields.media = media;
    }

    const updatedStory = await Story.findOneAndUpdate({ _id: storyId, user: req.user.id }, updatedFields, { new: true });

    if (!updatedStory) {
      return res.status(404).json({ success: false, message: 'Story not found or you are not authorized to update this story' });
    }

    res.json(updatedStory);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a specific story
router.delete('/stories/:storyId', auth, async (req, res) => {
  try {
    const { storyId } = req.params;

    const deletedStory = await Story.findOneAndDelete({ _id: storyId, user: req.user.id });
    
    if (!deletedStory) {
      return res.status(404).json({ success: false, message: 'Story not found or you are not authorized to delete this story' });
    }

    const userId = deletedStory.user;
    
    // Find the user by their ID
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    // Remove the story reference from the user's stories array
    user.stories.pull(storyId);
    await user.save();
    
    res.json({ success: true, message: 'Story deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;