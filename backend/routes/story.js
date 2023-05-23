const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/fetchuser');
const Story = require('../models/Story');

const multer = require('multer');
const storage = require('../middleware/fetchmedia');

const upload = multer({ storage: storage('uploads/stories') });

// Create a new post
router.post(
  '/stories',
  auth, // Assuming you have an 'auth' middleware for authentication
  upload.single('media'),
  [
    body('description').optional().trim(),
    body('text').optional().trim()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Extract post data from the request body
      const { text, description } = req.body;
      const media = req.file ? req.file.path : null;

      // Validate that the story contains either text or media, not both
      if ((text && media) || (!text && !media)) {
        return res.status(400).json({ success: false, message: 'A story must contain either text or media' });
      }

      // Create a new Story object
      const newStory = new Story({
        text: text ? text : null,
        media: media ? media : null,
        description
      });

      // Save the post to the database
      await newStory.save();
      res.json(newStory);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }
);

// Get all stories
router.get('/stories', async (req, res) => {
  try {
    const stories = await Story.find();
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
    const story = await Story.findById(storyId);
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
    const { text, description } = req.body;
    const media = req.file ? req.file.path : null;

    // Validate that the story contains either text or media, not both
    if ((text && media) || (!text && !media)) {
      return res.status(400).json({ success: false, message: 'A story must contain either text or media' });
    }

    const updatedFields = {};

    if (text) {
      updatedFields.text = text;
      updatedFields.media = null;
    }

    else {
      updatedFields.text = null;
      updatedFields.media = media;
    }

    if (description) {
      updatedFields.description = description;
    } else {
      updatedFields.description = '';
    }

    const updatedStory = await Story.findByIdAndUpdate(storyId, updatedFields, { new: true });

    if (!updatedStory) {
      return res.status(404).json({ success: false, message: 'Story not found' });
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
    const deletedStory = await Story.findByIdAndDelete(storyId);
    if (!deletedStory) {
      return res.status(404).json({ success: false, message: 'Story not found' });
    }
    res.json({ success: true, message: 'Story deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;