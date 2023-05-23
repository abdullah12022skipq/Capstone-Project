const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/fetchuser');
const Story = require('../models/Story');

const multer = require('multer');
const storage = require('../middleware/fetchmedia');

const upload = multer({ storage: storage('uploads/stories') });

// Create a new story with file upload support
router.post('/stories', auth, upload.single('media'), [
  body('description').optional().trim(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let mediaType = 'text'; // Default media type is text

    if (req.file) {
      // Determine media type based on the file mimetype
      if (req.file.mimetype.startsWith('image/')) {
        mediaType = 'image';
      } else if (req.file.mimetype.startsWith('video/')) {
        mediaType = 'video';
      }
    }

    const newStory = new Story({
      description: req.body.description || '',
      media: {
        type: mediaType,
        data: req.file ? req.file.filename : undefined,
        contentType: req.file ? req.file.mimetype : undefined
      },
      user: req.user.id
    });

    await newStory.save();
    res.json(newStory);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});
// Update a Specific Media Story
router.put('/stories/:storyId', auth, upload.single('media'), [
  body('description').optional().trim(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { description } = req.body;
    const { file } = req;

    const updatedFields = { description };

    if (file) {
      let mediaType = 'text'; // Default media type is text

      // Determine media type based on the file mimetype
      if (file.mimetype.startsWith('image/')) {
        mediaType = 'image';
      } else if (file.mimetype.startsWith('video/')) {
        mediaType = 'video';
      }

      updatedFields.media = {
        type: mediaType,
        data: file.filename,
        contentType: file.mimetype
      };
    }

    const updatedStory = await Story.findByIdAndUpdate(
      req.params.storyId,
      updatedFields,
      { new: true }
    ).populate('user', ['username']);

    if (!updatedStory) {
      return res.status(404).json({ error: 'Story not found' });
    }

    res.json(updatedStory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/textstories', auth, [
  body('text', 'Text is required').trim().notEmpty(),
  body('description').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { text, description } = req.body;

    const newStory = new Story({
      description: description || '', // If description is not provided, set it to an empty string
      text,
      user: req.user.id
    });

    await newStory.save();

    res.json(newStory);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Update a Specific Story
router.put('/textstories/:storyId', auth, async (req, res) => {
  try {
    const { text, description } = req.body;
    const updatedFields = {};

    if (text) {
      updatedFields.text = text;
    }

    if (description) {
      updatedFields.description = description;
    }

    const updatedStory = await Story.findByIdAndUpdate(
      req.params.storyId,
      updatedFields,
      { new: true }
    ).populate('user', ['username']);

    if (!updatedStory) {
      return res.status(404).json({ error: 'Story not found' });
    }

    res.json(updatedStory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// get all stories
router.get('/stories', async (req, res) => {
  try {
    const stories = await Story.find().populate('user', ['username']);
    res.json(stories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Get a Specific Story
router.get('/stories/:storyId', async (req, res) => {
  try {
    const story = await Story.findById(req.params.storyId).populate('user', ['username']);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.json(story);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a Specific Story
router.delete('/stories/:storyId', auth, async (req, res) => {
  try {
    const deletedStory = await Story.findByIdAndRemove(req.params.storyId);

    if (!deletedStory) {
      return res.status(404).json({ error: 'Story not found' });
    }

    res.json({ message: 'Story deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;